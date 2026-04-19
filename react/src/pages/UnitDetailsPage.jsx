import { useParams, Link } from 'react-router-dom';
import { unitsData } from '../data/units';

export default function UnitDetailsPage() {
  const { id } = useParams();
  
  const unit = unitsData.find((item) => item.id === parseInt(id));

  if (!unit) {
    return (
        <div className="container mx-auto text-center mt-20 flex-grow">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Приміщення не знайдено </h2>
            <Link to="/catalog" className="text-blue-600 underline">Повернутися до каталогу</Link>
        </div>
    );
  }

  return (
    <main className="container mx-auto p-4 flex-grow mt-6">
      <Link to="/catalog" className="text-red-800 hover:underline mb-4 inline-block">
        &larr; Назад до каталогу
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{unit.title}</h1>
        <div className="bg-gray-200 h-64 w-full flex items-center justify-center text-gray-500 rounded mb-6">
            Тут буде велике фото {unit.title}
        </div>
        <p className="text-xl text-gray-600 mb-2">Площа: <span className="font-bold">{unit.area} кв.м</span></p>
        <p className="text-2xl text-red-800 font-bold">Ціна: {unit.price} грн/день</p>
      </div>
    </main>
  );
}