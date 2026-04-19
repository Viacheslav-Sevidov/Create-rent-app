import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="container mx-auto p-4 flex-grow mt-6 max-w-4xl">
      <Link to="/" className="text-red-800 hover:underline mb-6 inline-block">
        &larr; Назад на головну
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Про проект «Оренда Площ»
          </h1>
          <div className="w-24 h-1 bg-red-800 mx-auto rounded"></div>
        </div>
        
        <div className="prose max-w-none text-gray-700 space-y-6 text-lg">
          <p>
            Цей веб-застосунок є **MVP (Minimum Viable Product)** системи для швидкого пошуку та онлайн-бронювання комерційної нерухомості. Проект розроблено в рамках навчальної курсової роботи
          </p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Наша місія</h3>
            <p>
                Спростити процес взаємодії між орендодавцями та бізнесом, надавши зручний інструмент для перегляду доступних площ, динамічного розрахунку вартості оренди та збереження замовлень.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Технологічний стек</h3>
          <ul className="list-disc list-inside space-y-2 pl-4 marker:text-red-800">
            <li><span className="font-bold">Frontend:</span> React.js, Vite.js.</li>
            <li><span className="font-bold">Навігація:</span> React Router (Single Page Application).</li>
            <li><span className="font-bold">Стилізація:</span> Tailwind CSS.</li>
            <li><span className="font-bold">Збереження даних:</span> LocalStorage API (функціонал кошика).</li>
            <li><span className="font-bold">Backend (у розробці):</span> Laravel (REST API).</li>
          </ul>

          <p className="mt-8 text-sm text-gray-500 text-center pt-6 border-t border-gray-100">
            Всі права захищені © 2026 рік. Проект розроблено суто з навчальною метою.
          </p>
        </div>
      </div>
    </main>
  );
}