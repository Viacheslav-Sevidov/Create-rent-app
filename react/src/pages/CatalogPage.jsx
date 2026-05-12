import { useState, useEffect } from 'react';
import UnitCard from '../components/UnitCard';
import axiosInstance from '../api/axios';

export default function CatalogPage() {
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rentMessage, setRentMessage] = useState(null);
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
    localStorage.setItem('rentCart', JSON.stringify(cart));
  }, [cart]);

  const handleRent = (unit, days, total) => {
    const newItem = { 
        id: Date.now(), 
        unit_id: unit.id, // ID для бази даних
        title: `Приміщення ${unit.unit_number}`, 
        days, 
        total 
    };
    setCart(prev => [...prev, newItem]);
    setRentMessage(`Додано! "${unit.unit_number}" у кошику.`);
    setTimeout(() => setRentMessage(null), 3000);
  };

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

  useEffect(() => {
    Promise.all([
      axiosInstance.get('/units'),
      axiosInstance.get('/categories')
    ])
      .then(([unitsResponse, categoriesResponse]) => {
        setUnits(unitsResponse.data);
        setCategories(categoriesResponse.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Помилка завантаження даних.");
        setIsLoading(false);
      });
  }, []);

  const filteredUnits = activeCategory 
    ? units.filter(unit => unit.category_id === activeCategory)
    : units;

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <div className="flex justify-between items-end mb-6 relative z-10">
        <h1 className="text-3xl font-bold text-gray-800">Каталог приміщень</h1>
        
        <div className="relative">
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-3 hover:bg-gray-800 transition shadow-md">
                🛒 Кошик <span className="bg-red-600 text-xs px-2 py-1 rounded-full">{cart.length}</span>
            </button>
            {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50 text-gray-800">
                    {cart.length === 0 ? <p className="text-center text-gray-400">Пусто</p> : (
                        <>
                            <ul className="space-y-2 max-h-60 overflow-auto mb-4">
                                {cart.map(i => (
                                    <li key={i.id} className="text-sm flex justify-between border-b pb-2">
                                        <div>
                                            <span className="font-medium">{i.title}</span>
                                            <span className="block text-xs text-gray-500">{i.days} дн.</span>
                                        </div>
                                        <b className="text-red-800">{i.total} грн</b>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
          {filteredUnits.map((item) => (
              <UnitCard 
                  key={item.id} 
                  unit={item} 
                  onRent={(title, days, total) => handleRent(item, days, total)} 
                  isPromo={item.unit_number === 'A-101' || item.unit_number === 'B-201'} 
              />
          ))}
      </div>

      {rentMessage && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl z-50">{rentMessage}</div>}
    </main>
  );
}