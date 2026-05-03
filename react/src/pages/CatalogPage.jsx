import { useState, useEffect } from 'react';
import UnitCard from '../components/UnitCard';
import axiosInstance from '../api/axios';

export default function CatalogPage() {
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        console.error("Помилка завантаження:", err);
        setError("Не вдалося завантажити дані з сервера. Перевірте підключення.");
        setIsLoading(false);
      });
  }, []);

  const handleRent = (title, days, total) => alert(`Оренда: ${title}, Днів: ${days}, Сума: ${total} грн`);

  const filteredUnits = activeCategory 
    ? units.filter(unit => unit.id % categories.length === activeCategory % categories.length) // Імітація фільтрації
    : units;

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Каталог приміщень</h1>
      
      {!isLoading && !error && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === null 
                ? 'bg-red-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Всі приміщення
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === category.id 
                  ? 'bg-red-800 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {isLoading && <div className="text-center text-xl text-gray-600 my-10">Завантаження з бази даних...</div>}
      {error && <div className="bg-red-100 text-red-700 p-4 rounded text-center my-10">{error}</div>}

      {!isLoading && !error && (
        <>
          {filteredUnits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredUnits.map((item) => (
                  <UnitCard key={item.id} unit={item} onRent={handleRent} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 my-10 text-lg">
              У цій категорії поки немає приміщень.
            </div>
          )}
        </>
      )}
    </main>
  );
}