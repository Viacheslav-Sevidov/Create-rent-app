import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    setIsSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    if (!formData.name.trim()) {
        newErrors.name = "Ім'я є обов'язковим полем.";
    }
    
    if (!formData.email.includes('@')) {
        newErrors.email = "Email має обов'язково містити символ '@'.";
    }
    
    if (formData.message.length < 10) {
        newErrors.message = "Повідомлення не може бути коротшим за 10 символів.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      console.log('Відправлені дані:', formData);
    }
  };

  return (
    <main className="container mx-auto p-4 flex-grow mt-6 max-w-2xl">
      <Link to="/" className="text-red-800 hover:underline mb-6 inline-block">
        &larr; Назад на головну
      </Link>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Зв'яжіться з нами
        </h1>

        {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 font-bold text-center">
                Дякуємо! Ваше повідомлення успішно надіслано.
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Ваше ім'я
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-red-800'}`}
              placeholder="Введіть ваше ім'я"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Електронна пошта
            </label>
            <input
              type="text" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-red-800'}`}
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
              Текст повідомлення
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-red-800'}`}
              placeholder="Опишіть ваше питання (мінімум 10 символів)..."
            ></textarea>
            {errors.message && <p className="text-red-600 text-sm mt-1 font-semibold">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-800 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Відправити повідомлення
          </button>
        </form>
      </div>
    </main>
  );
}