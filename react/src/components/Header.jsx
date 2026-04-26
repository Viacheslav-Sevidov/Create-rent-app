import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-red-800 text-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Оренда Площ</div>
        
        <div className="space-x-4">
          <Link to="/" className="hover:text-red-300">Головна</Link>
          <Link to="/catalog" className="hover:text-red-300">Каталог</Link>
          <Link to="/about" className="hover:text-red-300">Про нас</Link>
          <Link to="/contact" className="hover:text-red-200">Контакти</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-white hover:underline">Вхід</a>
          <a href="/register" className="bg-white text-red-800 px-3 py-1 rounded hover:bg-gray-200 transition">
            Реєстрація
          </a>
        </div>
      </nav>
    </header>
  );
}