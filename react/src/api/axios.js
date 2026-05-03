import axios from 'axios';

// Створюємо базовий екземпляр axios
const axiosInstance = axios.create({
    // Вказуємо базову адресу твого Laravel-сервера
    // Зазвичай Laravel запускається на 8000 порту
    baseURL: 'http://127.0.0.1:8000/api',
    
    // Вказуємо, що ми завжди хочемо отримувати та відправляти JSON
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axiosInstance;