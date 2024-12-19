"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types/Product"; // Предполагаем, что тип Product уже определен в проекте
import ProductCard from "@/components/ProductCard"; // Импортируем вашу карточку товара
import API_URL from "@/config";
import Cookies from "js-cookie";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]); // Состояние для хранения товаров в корзине
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения товаров из корзины через GET-запрос
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Получаем токен из cookies
      const token = Cookies.get("token");

      if (!token) {
        setError("Необходима авторизация.");
        setLoading(false);
        return;
      }

      // Отправка GET-запроса для получения товаров из корзины
      const response = await axios.get(`${API_URL}/getCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Устанавливаем товары в состояние
      setCartItems(response.data || []); // Защищаем от null/undefined
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    // Логика для удаления товара из корзины
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    // Здесь также можно отправить запрос на сервер для обновления корзины
  };

  return (
    <div className="min-h-screen bg-LightIceBlue py-8">
      <h1 className="text-3xl font-bold text-center text-DarkAquamarine mb-8">Корзина</h1>

      {/* Статус загрузки */}
      {loading && <p className="text-center text-DarkAquamarine ">Загрузка товаров...</p>}

      {/* Ошибка при загрузке */}
      {error && <p className="text-center text-red-500">Ошибка: {error}</p>}

      {/* Отображение товаров в корзине */}
      {!loading && !error && Array.isArray(cartItems) && cartItems.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {cartItems.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />

              {/* Кнопка для удаления товара */}
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Если корзина пуста */}
      {!loading && !error && Array.isArray(cartItems) && cartItems.length === 0 && (
        <p className="text-center text-gray-600">Ваша корзина пуста.</p>
      )}
    </div>
  );
};

export default CartPage;