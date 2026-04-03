import { useState } from 'react';

export default function UnitCard({ unit }) {
  const [days, setDays] = useState(1);

  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => {
      if (days > 1) {
          setDays(days - 1);
      }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
        Фото {unit.title}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{unit.title}</h3>
        <p className="text-gray-600 mt-1">Площа: {unit.area} кв.м</p>
        <p className="text-red-800 font-bold mt-2 text-lg">Ціна: {unit.price} грн/день</p>

        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <button 
                    onClick={decrementDays}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                    -
                </button>
                <span className="font-bold w-12 text-center">{days} днів</span>
                <button 
                    onClick={incrementDays}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                    +
                </button>
            </div>
            
            <div className="font-bold text-gray-700">
                Загалом: {unit.price * days} грн
            </div>
        </div>

        <button className="w-full mt-4 bg-red-800 text-white py-2 rounded hover:bg-red-700 transition">
          Орендувати
        </button>
      </div>
    </div>
  );
}