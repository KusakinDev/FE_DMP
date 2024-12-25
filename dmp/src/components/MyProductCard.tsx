"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
import API_URL from "@/config";
import axios from "axios";
import Cookies from "js-cookie";

interface MyProductCardProps {
  product: Product;
  onUpdate: () => Promise<void>; // Функция для обновления списка товаров
}

const MyProductCard: React.FC<MyProductCardProps> = ({ product, onUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSell, setIsSell] = useState<boolean>(product.is_sell); // Локальное состояние для is_sell

  const handleToggleSell = async () => {
    if (product.is_buy) return; // Блокируем действие, если товар продан

    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get("token");

      if (!token) {
        setError("Необходима авторизация.");
        setLoading(false);
        return;
      }

      // Выбираем эндпоинт и данные в зависимости от состояния
      const endpoint = isSell
        ? "/protected/disableProductCard"
        : "/protected/enableProductCard";

      // Отправка запроса на сервер
      await axios.post(
        `${API_URL}${endpoint}`,
        { id: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Обновляем локальное состояние
      setIsSell(!isSell);

      // Обновляем список товаров
      await onUpdate();
    } catch (error) {
      console.error("Ошибка при изменении состояния товара:", error);
      setError("Не удалось обновить статус товара.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center rounded-lg shadow-md p-4 relative ${
        product.is_buy
          ? "bg-DeepTealBlue"
          : isSell
          ? "bg-PastelBlue"
          : "bg-GrayishBlue"
      }`}
    >
      {/* Основной контент */}
      <div className="flex flex-grow flex-col md:flex-row items-center">
        {/* Изображение товара */}
        <img
          src={product.image}
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg mr-4"
        />

        {/* Описание товара */}
        <div className="flex-grow">
          <h3 className="text-DarkOceanBlue font-semibold">{product.title}</h3>
          <p className="text-DarkOceanBlue text-sm">{product.description}</p>
          <hr className="my-2 border-t border-DarkOceanBlue" />
          <p className="text-DarkOceanBlue text-sm">
            Цена:{" "}
            {Number(product.price.toFixed(9)).toLocaleString("en", {
              useGrouping: false,
              maximumFractionDigits: 9,
            })}{" "}
            ETH
          </p>
          <p className="text-DarkOceanBlue text-sm">
            Дата публикации: {product.date_pub.substring(0, 10)}
          </p>
        </div>

        {/* Кнопка изменения состояния продажи */}
        <div className="mt-14 flex items-center space-x-4">
          <button
            onClick={handleToggleSell}
            className={`${
              product.is_buy
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-DarkSlateBlue hover:bg-DeepTealBlue"
            } text-white px-4 py-2 rounded focus:outline-none`}
            disabled={loading || product.is_buy} // Деактивируем кнопку, если товар продан
          >
            {product.is_buy
              ? "ПРОДАНО"
              : loading
              ? "Обновление..."
              : isSell
              ? "Снять с продажи"
              : "Выставить на продажу"}
          </button>
        </div>
      </div>

      {/* Отображение ошибки */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MyProductCard;
