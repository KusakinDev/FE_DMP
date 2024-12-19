"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import axios from 'axios';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с cookies

const FeedPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // Состояние для хранения продуктов
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState<string | null>(null); // Состояние для ошибки

  useEffect(() => {
    const fetchProducts = async () => {
      const token = Cookies.get('token'); // Получаем токен из cookies

      if (!token) {
        setError('No JWT token found in cookies');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/getAllFeed', {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        });

        setProducts(response.data); // Получаем продукты из ответа
      } catch (err) {
        setError('Error fetching products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Эффект выполняется только один раз при монтировании компонента

  if (loading) {
    return <div>Loading...</div>; // Показываем "Загрузка", пока данные не загружены
  }

  if (error) {
    return <div>Error: {error}</div>; // Показываем ошибку, если она произошла
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
