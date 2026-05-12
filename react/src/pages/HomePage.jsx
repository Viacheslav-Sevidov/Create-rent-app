import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnitCard from '../components/UnitCard';
import axiosInstance from '../api/axios';

export default function Main() {
  const [promoUnits, setPromoUnits] = useState([]);
  const [rentMessage, setRentMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);
  
  // --- СТАНИ КОШИКА ТА ОФОРМЛЕННЯ ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      company_name: '', edrpou: '', contact_person: '', phone: '', email: ''
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('rentCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axiosInstance.get('/units')
      .then((res) => {
        setPromoUnits(res.data.slice(0, 2));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('rentCart', JSON.stringify(cart));
  }, [cart]);

  // --- ОНОВЛЕНИЙ handleRent (зберігає unit_id) ---
  const handleRent = (unit, days, total) => {
    const newItem = { 
        id: Date.now(), 
        unit_id: unit.id, // Додали ID для бази!
        title: `Приміщення ${unit.unit_number}`, 
        days, 
        total 
    };
    setCart(prev => [...prev, newItem]);
    setRentMessage(`Додано! "${unit.unit_number}" у кошику.`);
    setTimeout(() => setRentMessage(null), 3000);
  };

  // --- ФУНКЦІЯ ВІДПРАВКИ ЗАМОВЛЕННЯ ---
  const handleCheckoutSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          for (const item of cart) {
              await axiosInstance.post('/checkout', {
                  ...formData,
                  unit_id: item.unit_id,
                  days: item.days,
                  total_price: item.total
              });
          }
          setCart([]);
          setIsCheckoutOpen(false);
          setIsCartOpen(false);
          setRentMessage("Успіх! Договори оренди сформовано.");
          setTimeout(() => setRentMessage(null), 5000);
      } catch (err) {
          alert("Помилка при оформленні. Перевірте дані.");
      } finally {
          setIsSubmitting(false);
      }
  };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (isLoading) return <div className="text-center mt-20">Завантаження пропозицій...</div>;

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      
      {/* ТВІЙ ОРИГІНАЛЬНИЙ БАНЕР З ТАЙМЕРОМ */}
      <div className="bg-gradient-to-r from-red-800 to-red-600 text-white p-8 rounded-2xl mb-10 shadow-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-4xl font-black mb-2">ГАРЯЧИЙ СЕЗОН!</h2>
          <p className="text-xl opacity-90">Встигни забронювати офіс зі знижкою 15%</p>
        </div>
        <div className="mt-6 md:mt-0 text-center">
            <p className="text-sm uppercase tracking-widest mb-1 opacity-80">До кінця акції:</p>
            <div className="text-5xl font-mono font-bold bg-white text-red-800 px-6 py-2 rounded-xl">
                {formatTime(timeLeft)}
            </div>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8 relative z-20">
        <h3 className="text-2xl font-bold text-gray-800 border-b-4 border-red-800 pb-2">Найкращі пропозиції дня</h3>
        
        {/* ОНОВЛЕНИЙ КОШИК З КНОПКОЮ ОФОРМЛЕННЯ */}
        <div className="relative">
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-gray-800 transition">
                🛒 Кошик <span className="bg-red-600 text-xs px-2 py-1 rounded-full">{cart.length}</span>
            </button>
            {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50 text-gray-800">
                    {cart.length === 0 ? <p className="text-center text-gray-400 my-2">Пусто</p> : (
                        <>
                            <ul className="space-y-2 max-h-60 overflow-auto mb-4">
                                {cart.map(i => (
                                    <li key={i.id} className="text-sm flex justify-between items-center border-b pb-2 mb-1">
                                        <div>
                                            <span className="block font-medium">{i.title}</span> 
                                            <span className="text-gray-500 text-xs block mt-0.5">Тривалість: {i.days} дн.</span>
                                        </div>
                                        <b className="text-red-800 whitespace-nowrap">{i.total} грн</b>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-red-800 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition">
                                Оформити договір
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
      </div>

      {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                  <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-xl">&times;</button>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Оформлення договору</h2>
                  
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Юридична назва компанії *</label>
                          <input type="text" required placeholder='ТОВ "Альфа"' className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200 outline-none" 
                              value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">ЄДРПОУ (8 цифр) *</label>
                          <input type="text" required placeholder="12345678" className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200 outline-none" 
                              value={formData.edrpou} onChange={e => setFormData({...formData, edrpou: e.target.value})} />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">ПІБ представника *</label>
                          <input type="text" required placeholder="Іваненко Іван" className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200 outline-none" 
                              value={formData.contact_person} onChange={e => setFormData({...formData, contact_person: e.target.value})} />
                      </div>
                      <div className="flex gap-4">
                          <div className="w-1/2">
                              <label className="block text-sm font-bold text-gray-700 mb-1">Телефон *</label>
                              <input type="tel" required placeholder="+380..." className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200 outline-none" 
                                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                          </div>
                          <div className="w-1/2">
                              <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                              <input type="email" required placeholder="mail@ukr.net" className="w-full border rounded-lg p-2 focus:ring focus:ring-red-200 outline-none" 
                                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                          </div>
                      </div>

                      <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className={`w-full text-white font-bold py-3 rounded-xl mt-4 transition-all shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                      >
                          {isSubmitting ? 'Відправка...' : 'Підтвердити та укласти договір'}
                      </button>
                  </form>
              </div>
          </div>
      )}

      {rentMessage && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl z-50 animate-bounce">{rentMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto relative z-10">
        {promoUnits.map((item) => (
            <UnitCard 
                key={item.id} 
                unit={item} 
                onRent={(title, days, total) => handleRent(item, days, total)} 
                isPromo={true} 
            />
        ))}
      </div>

      <div className="mt-16 text-center">
          <Link to="/catalog" className="text-red-800 font-bold text-lg hover:underline">
              Переглянути всі приміщення в каталозі →
          </Link>
      </div>
    </main>
  );
}