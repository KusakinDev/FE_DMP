'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        name,
        password,
        type: 0, // Добавляем поле type с значением 0
      });
      
      if (response.status === 200) {
        const token = response.data.token; // Предполагается, что сервер возвращает токен в поле 'token'
        console.log('JWT Token:', token); // Выводим токен в консоль
        Cookies.set('token', token, { expires: 7, sameSite: 'Strict' });
        router.push('/pages/feed'); // Переход на другое окно (страницу)
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Логин
            </label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите логин"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите пароль"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Вход
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


