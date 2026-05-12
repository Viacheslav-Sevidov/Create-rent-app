import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UnitCard({ unit, onRent, isPromo = false }) {
  const [days, setDays] = useState(1);
  
  // Розрахунок ціни: якщо акція - мінус 15%
  const currentPrice = isPromo ? Math.round(unit.base_price * 0.85) : unit.base_price;
  const totalPrice = currentPrice * days;

  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => {
      if (days > 1) {
          setDays(days - 1);
      }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border ${isPromo ? 'border-red-500 relative ring-2 ring-red-100' : 'border-gray-200'}`}>
      
      {isPromo && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
          АКЦІЯ -15%
        </div>
      )}

      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
        Фото {unit.unit_number}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">
            <Link to={`/unit/${unit.id}`} className="hover:text-red-800 transition">
               Приміщення {unit.unit_number}
           </Link>
        </h3>
        <p className="text-gray-600 mt-1">Площа: {unit.area} кв.м</p>
        
        <div className="mt-2 text-lg">
          {isPromo && (
             <span className="line-through text-gray-400 mr-2 text-sm">{unit.base_price} грн</span>
          )}
          <span className="text-red-800 font-bold">Ціна: {currentPrice} грн/день</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button onClick={decrementDays} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">-</button>
                <span className="font-bold w-12 text-center">{days} днів</span>
                <button onClick={incrementDays} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">+</button>
            </div>
            <div className="font-bold text-gray-700">
                Загалом: {totalPrice} грн
            </div>
        </div>

        <button 
          onClick={() => onRent(`Приміщення ${unit.unit_number}`, days, totalPrice)}
          className={`w-full mt-4 text-white py-2 rounded transition ${isPromo ? 'bg-red-600 hover:bg-red-700' : 'bg-red-800 hover:bg-red-700'}`}
        >
          Орендувати
        </button>
      </div>
    </div>
  );
}