import { useState, useEffect } from 'react';
import UnitCard from '../components/UnitCard';
import { unitsData } from '../data/units';

export default function Main() {
  const featuredUnits = unitsData;

  const [rentMessage, setRentMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('rentCart');
    if (!savedCart) return [];
    
    try {
        const parsed = JSON.parse(savedCart);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('rentCart', JSON.stringify(cart));
  }, [cart]);

  const handleRent = (title, days, total) => {
    setRentMessage(`Успішно! Ви орендували "${title}" на ${days} днів.`);
    
    const newItem = {
        id: Date.now(),
        title: title,
        days: days,
        total: total
    };
    
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isLoading) {
    return (
      <main className="container mx-auto p-4 flex-grow flex items-center justify-center mt-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-800"></div>
          <p className="mt-4 text-gray-600 font-bold text-xl">Завантаження площ...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      
      {timeLeft > 0 && (
        <div className="bg-red-100 border-l-4 border-red-800 text-red-900 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center rounded shadow-sm">
          <div className="mb-2 sm:mb-0">
            <h3 className="font-bold text-lg">🔥 Гаряча пропозиція!</h3>
            <p>Знижка 15% на всі офісні приміщення. Поспішай!</p>
          </div>
          <div className="text-2xl font-mono font-bold bg-white px-4 py-2 rounded shadow text-red-800">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Доступні приміщення для оренди
          </h1>
          <p className="text-gray-600 text-lg">
            Оберіть потрібну площу та вкажіть кількість днів.
          </p>
        </div>

        <div className="relative w-full md:w-80">
            <div 
                className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-700 transition"
                onClick={() => setIsCartOpen(!isCartOpen)} // Перемикаємо стан Відкрито/Закрито
            >
                <span className="font-bold text-lg select-none">
                    🛒 Ваш кошик {isCartOpen ? '▲' : '▼'}
                </span>
                <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    {cart.length} шт.
                </span>
            </div>

            {isCartOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-gray-800 text-white rounded-lg shadow-xl p-4 z-50 border border-gray-700">
                    {cart.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-2">Кошик порожній</p>
                    ) : (
                        <ul className="text-sm space-y-2 max-h-48 overflow-y-auto">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between border-b border-gray-700 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                                    <span>{item.title} <span className="text-gray-400">({item.days} дн.)</span></span>
                                    <span className="font-bold text-red-400">{item.total} грн</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
      </div>

      {rentMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative inline-block mb-6 w-full text-center">
          <span className="block sm:inline font-bold">{rentMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
        {featuredUnits.map((item) => (
            <UnitCard key={item.id} unit={item} onRent={handleRent} />
        ))}
      </div>
    </main>
  );
}