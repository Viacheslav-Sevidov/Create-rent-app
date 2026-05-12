import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; 

export default function UnitDetailsPage() {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(1);
  
  const [rentMessage, setRentMessage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // --- СТАНИ ДЛЯ ФОРМИ ОФОРМЛЕННЯ ---
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
      .then((response) => {
        const foundUnit = response.data.find((item) => item.id === parseInt(id));
        if (foundUnit) setUnit(foundUnit);
        else setError("Приміщення не знайдено.");
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Помилка підключення до сервера.");
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    localStorage.setItem('rentCart', JSON.stringify(cart));
  }, [cart]);

  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => { if (days > 1) setDays(days - 1); };

  const handleRent = () => {
    if (!unit) return;
    const isPromo = unit.unit_number === 'A-101' || unit.unit_number === 'B-201';
    const currentPrice = isPromo ? Math.round(unit.base_price * 0.85) : unit.base_price;
    const totalPrice = currentPrice * days; 
    
    const newItem = {
        id: Date.now(),
        unit_id: unit.id, // ДОДАЛИ ID ПРИМІЩЕННЯ ДЛЯ БЕКЕНДУ!
        title: `Приміщення ${unit.unit_number}`,
        days: days,
        total: totalPrice
    };
    
    setCart((prev) => [...prev, newItem]);
    setRentMessage(`"${newItem.title}" на ${days} дн. додано до кошика!`);
    setTimeout(() => setRentMessage(null), 3000);
  };

  // --- ФУНКЦІЯ ВІДПРАВКИ ЗАМОВЛЕННЯ НА LARAVEL ---
  const handleCheckoutSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
          // Відправляємо кожне замовлення з кошика на бекенд
          for (const item of cart) {
              await axiosInstance.post('/checkout', {
                  company_name: formData.company_name,
                  edrpou: formData.edrpou,
                  contact_person: formData.contact_person,
                  phone: formData.phone,
                  email: formData.email,
                  unit_id: item.unit_id,
                  days: item.days,
                  total_price: item.total
              });
          }

          // Якщо все успішно: очищаємо кошик і закриваємо форму
          setCart([]);
          setIsCheckoutOpen(false);
          setIsCartOpen(false);
          setRentMessage("Успіх! Договір оренди створено. Очікуйте дзвінка.");
          setTimeout(() => setRentMessage(null), 5000);

      } catch (err) {
          console.error("Помилка оформлення:", err.response?.data || err.message);
          alert("Виникла помилка. Перевірте консоль або дані форми.");
      } finally {
          setIsSubmitting(false);
      }
  };

  if (isLoading) return <div className="text-center mt-20">Завантаження даних...</div>;
  if (error) return <div className="text-center mt-20 text-red-800 font-bold">{error}</div>;

  const isPromo = unit.unit_number === 'A-101' || unit.unit_number === 'B-201';
  const displayPrice = isPromo ? Math.round(unit.base_price * 0.85) : unit.base_price;
  const totalPrice = displayPrice * days; 

  return (
    <main className="container mx-auto p-4 flex-grow mt-6 relative">
      <div className="flex justify-between items-center mb-6">
        <Link to="/catalog" className="text-red-800 hover:underline">&larr; Назад до каталогу</Link>

        {/* Кошик */}
        <div className="relative z-40">
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-gray-900 text-white px-5 py-2 rounded-full font-bold flex items-center gap-3 shadow-md">
                🛒 Кошик <span className="bg-red-600 text-xs px-2 py-1 rounded-full">{cart.length}</span>
            </button>
            {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50 text-gray-800">
                    {cart.length === 0 ? <p className="text-center text-gray-400 my-2">Кошик порожній</p> : (
                        <>
                            <ul className="space-y-2 max-h-60 overflow-auto mb-4">
                                {cart.map(i => (
                                    <li key={i.id} className="text-sm flex justify-between items-center border-b pb-2">
                                        <div>
                                            <span className="block font-medium">{i.title}</span> 
                                            <span className="text-gray-500 text-xs">Тривалість: {i.days} дн.</span>
                                        </div>
                                        <b className="text-red-800">{i.total} грн</b>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => setIsCheckoutOpen(true)}
                                className="w-full bg-red-800 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition"
                            >
                                Оформити замовлення
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

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row relative z-10">
        <div className="md:w-1/2 bg-gray-200 h-80 md:h-auto flex items-center justify-center text-gray-400 text-xl font-bold">
           Фото {unit.unit_number}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
              {isPromo && <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block animate-pulse">АКЦІЙНА ПРОПОЗИЦІЯ -15%</span>}
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Приміщення {unit.unit_number}</h1>
              <div className="space-y-4 mb-8">
                <p className="text-xl text-gray-600">Площа: <span className="text-gray-900 font-bold">{unit.area} кв.м</span></p>
                <p className="text-xl text-gray-600">Поверх: <span className="text-gray-900 font-bold">{unit.floor}</span></p>
                <p className="text-xl text-gray-600">Кондиціонер: <span className="text-gray-900 font-bold">{unit.has_conditioner ? "Є" : "Відсутній"}</span></p>
              </div>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600 text-lg font-medium">Кількість днів:</span>
                <div className="flex items-center space-x-4 bg-gray-100 p-1.5 rounded-lg border border-gray-200">
                    <button onClick={decrementDays} className="bg-white px-4 py-1 rounded shadow-sm hover:bg-gray-200 font-bold text-xl text-gray-700">-</button>
                    <span className="font-bold text-xl w-8 text-center text-gray-800">{days}</span>
                    <button onClick={incrementDays} className="bg-white px-4 py-1 rounded shadow-sm hover:bg-gray-200 font-bold text-xl text-gray-700">+</button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
               <span className="text-gray-600 font-bold uppercase tracking-wider text-sm">До сплати:</span>
               <div className="flex items-baseline gap-3 text-right">
                   {isPromo && <span className="line-through text-gray-400 text-lg">{unit.base_price * days} грн</span>}
                   <span className="text-4xl font-black text-red-800">{totalPrice} грн</span>
               </div>
            </div>
            <button onClick={handleRent} className="w-full bg-red-800 text-white text-xl font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95">
              Додати в кошик
            </button>
          </div>
        </div>
      </div>

      {rentMessage && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl z-50">{rentMessage}</div>}
    </main>
  );
}