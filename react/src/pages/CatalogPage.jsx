import UnitCard from '../components/UnitCard';
import { unitsData } from '../data/units';

export default function CatalogPage() {
  const handleRent = (title) => alert(`Оренда ${title} в розробці!`);

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Каталог приміщень</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {unitsData.map((item) => (
            <UnitCard key={item.id} unit={item} onRent={handleRent} />
        ))}
      </div>
    </main>
  );
}