"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "@/config";
import Cookies from "js-cookie";
import MyProductCard from "@/components/MyProductCard";
import { Product } from "@/types/Product";

interface User {
  name: string;
  email: string;
  rating: number;
  count_rating: number;
  debug_wallet: number;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Получение данных профиля
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get("token");

      if (!token) {
        setError("Необходима авторизация.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/protected/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  // Получение списка товаров
  const fetchMyProducts = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        setError("Необходима авторизация.");
        return;
      }

      const response = await axios.get(`${API_URL}/protected/getMyGoods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyProducts(response.data || []);
    } catch (err) {
      console.error("Ошибка загрузки товаров:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchMyProducts();
  }, []);

  // Обновление списка товаров
  const updateProducts = async () => {
    await fetchMyProducts(); // Повторное получение товаров
  };

  // Разделение товаров на три группы
  const productsOnSale = myProducts.filter((product) => product.is_sell && !product.is_buy);
  const productsNotOnSale = myProducts.filter((product) => !product.is_sell && !product.is_buy);
  const productsSold = myProducts.filter((product) => product.is_buy);

  return (
    <div className="min-h-screen bg-LightIceBlue py-8">
      <h1 className="text-3xl font-bold text-center text-DarkAquamarine mb-8">
        Профиль
      </h1>

      {loading && (
        <p className="text-center text-DarkAquamarine">Загрузка данных...</p>
      )}
      {error && <p className="text-center text-red-500">Ошибка: {error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
        {/* Левая колонка: Профиль */}
        <div>
          <h1 className="text-xl font-bold text-center text-DarkAquamarine mb-8">
            Обо мне
          </h1>
          {!loading && !error && user && (
            <div className="bg-PastelBlue rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-DarkOceanBlue mb-4">
                {user.name}
              </h2>
              <p className="text-DarkOceanBlue">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-DarkOceanBlue">
                <strong>Рейтинг:</strong> ✦{user.rating.toFixed(1)}
              </p>
              <p className="text-DarkOceanBlue">
                <strong>Количество оценок:</strong> {user.count_rating}
              </p>
              <p className="text-DarkOceanBlue">
                <strong>Дебаг-кошелек:</strong>{" "}
                {user.debug_wallet.toLocaleString("en", {
                  useGrouping: true,
                  maximumFractionDigits: 9,
                })}{" "}
                ETH
              </p>
            </div>
          )}
          {!loading && !error && !user && (
            <p className="text-center text-gray-600">
              Данные пользователя отсутствуют.
            </p>
          )}
        </div>

        {/* Правая колонка: Товары */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-center text-DarkAquamarine mb-8">
            Мои товары
          </h1>

          {/* Товары на продаже */}
          {productsOnSale.map((product) => (
            <MyProductCard
              key={product.id}
              product={product}
              onUpdate={updateProducts} // Передаем функцию обновления
            />
          ))}

          {/* Первая разделительная линия */}
          {productsNotOnSale.length > 0 && (
            <hr className="my-2 border-t border-DarkOceanBlue" />
          )}

          {/* Товары не на продаже */}
          {productsNotOnSale.map((product) => (
            <MyProductCard
              key={product.id}
              product={product}
              onUpdate={updateProducts} // Передаем функцию обновления
            />
          ))}

          {/* Вторая разделительная линия */}
          {productsSold.length > 0 && (
            <hr className="my-2 border-t border-DarkOceanBlue" />
          )}

          {/* Проданные товары */}
          {productsSold.map((product) => (
            <MyProductCard
              key={product.id}
              product={product}
              onUpdate={updateProducts} // Передаем функцию обновления
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
