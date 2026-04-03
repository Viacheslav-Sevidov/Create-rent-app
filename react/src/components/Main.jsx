import UnitCard from './UnitCard';

export default function Main() {
  const unitsList = [
    { id: 1, title: 'Офіс Центр', area: 50, price: 1000 },
    { id: 2, title: 'Торговий павільйон', area: 120, price: 2500 },
    { id: 3, title: 'Складське приміщення', area: 300, price: 800 },
    { id: 4, title: 'Коворкінг місце', area: 5, price: 300 },
  ];

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Доступні приміщення для оренди
        </h1>
        <p className="text-gray-600 text-lg">
          Оберіть потрібну площу та вкажіть кількість днів для розрахунку вартості.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {unitsList.map((item) => (
            <UnitCard key={item.id} unit={item} />
        ))}
      </div>
    </main>
  );
}