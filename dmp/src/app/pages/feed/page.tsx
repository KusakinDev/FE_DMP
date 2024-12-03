import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import axios from 'axios'; 
import { cookies } from 'next/headers';

const FeedPage = async () => {
  const cookieStore = await cookies(); // Получаем куки
  const token = cookieStore.get('token')?.value; // Извлекаем JWT токен из куки

  // Логируем токен для проверки
  console.log('JWT Token:', token);

  let products: Product[] = [];
  if (!token) {
    console.error('No JWT token found in cookies');
  } else {
    try {
      // Выполняем запрос через axios
      const response = await axios.get('http://localhost:8080/getAllFeed', {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      });

      // Если запрос успешен, получаем данные
      products = response.data; 
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message); // Логируем ошибку
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
