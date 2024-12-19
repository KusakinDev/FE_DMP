'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import API_URL from '@/config';

const LoginPage = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        name: name, // Совместимо с бэкендом
        password: password,
      });
      
      if (response.status === 200) {
        const token = response.data.token; // Токен JWT
        console.log('JWT Token:', token);

        const refreshToken = response.data.refreshToken; // Токен JWT
        console.log('refreshToken:', refreshToken);
        
        Cookies.set('token', token, { expires: 7, sameSite: 'Strict' }); // Сохраняем токен
        localStorage.setItem("refreshToken", refreshToken);

        router.push('/pages/feed'); // Переход на страницу ленты
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-LightIceBlue">
      <div className="w-full max-w-xs">
        <div className="bg-PastelBlue shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Логин
            </label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-LightIceBlue shadow appearance-none  rounded w-full py-2 px-3 text-DarkAquamarine leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-LightIceBlue shadow appearance-none rounded w-full py-2 px-3 text-DarkAquamarine leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите пароль"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleLogin}
              className="bg-DarkSlateBlue hover:bg-DeepTealBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
