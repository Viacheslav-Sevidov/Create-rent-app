import { useState } from 'react';
import UnitCard from './UnitCard';

export default function Main() {
  const featuredUnits = [
    { id: 1, title: 'Офіс Центр', area: 50, price: 1000 },
    { id: 2, title: 'Торговий павільйон', area: 120, price: 2500 },
    { id: 3, title: 'Складське приміщення', area: 300, price: 800 },
    { id: 4, title: 'Коворкінг місце', area: 5, price: 300 },
  ];

  // Стан для збереження повідомлення від дочірнього компонента
  const [rentMessage, setRentMessage] = useState(null);

  // Функція, яка буде викликана всередині картки (дочірнього компонента)
  const handleRent = (title, days, total) => {
    setRentMessage(`Успішно! Ви орендували "${title}" на ${days} днів. До сплати: ${total} грн.`);
  };

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Доступні приміщення для оренди
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Оберіть потрібну площу та вкажіть кількість днів для розрахунку вартості.
        </p>

        {/* Блок для демонстрації того, що подія піднялася нагору */}
        {rentMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative inline-block mb-4">
            <span className="block sm:inline font-bold">{rentMessage}</span>
          </div>
        )}
      </div>

      {/* Сітка для карток */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredUnits.map((item) => (
            // Передаємо функцію handleRent як prop
            <UnitCard key={item.id} unit={item} onRent={handleRent} />
        ))}
      </div>
    </main>
  );
}