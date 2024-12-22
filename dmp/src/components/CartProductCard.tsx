import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Product } from "@/types/Product";
import API_URL from "@/config";

interface CartProductCardProps {
  product: Product;
  onRemove: (productId: number) => void; // Функция для удаления товара из списка
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  product,
  onRemove,
}) => {
  const [isPaid, setIsPaid] = useState(false); // Состояние для оплаты
  const [isSelected, setIsSelected] = useState(false); // Состояние выделения
  const [error, setError] = useState<string | null>(null);

  const handleRemove = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        setError("Необходима авторизация.");
        return;
      }

      // Отправка запроса на сервер для удаления товара из корзины
      await axios.post(
        `${API_URL}/protected/removeFromCart`,
        { id: product.id }, // Тело запроса с ID товара
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Вызываем функцию onRemove после успешного удаления
      onRemove(product.id);
    } catch (err) {
      console.error("Ошибка при удалении товара из корзины:", err);
      setError("Не удалось удалить товар из корзины.");
    }
  };

  const handlePayment = () => {
    // Логика оплаты
    setIsPaid(true); // Устанавливаем состояние в true, чтобы показать, что товар оплачен
  };

  const handleSelection = () => {
    setIsSelected((prev) => !prev); // Переключаем состояние выделения
  };

  return (
    <div
      className={`flex items-center bg-PastelBlue rounded-lg shadow-md p-4 relative ${
        isSelected ? "border-2 border-GoldenYellow" : ""
      }`}
    >
      {/* Значок корзины в правом верхнем углу */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
      >
        🗑️ {/* Используется Unicode-символ корзины */}
      </button>

      {/* Флажок слева */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleSelection}
        className="w-6 h-6 mr-4 accent-DarkSlateBlue cursor-pointer"
      />

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
          <hr className="my-2 border-t border-DarkOceanBlue w-1/2" />
          <p className="text-DarkOceanBlue text-sm">
            Продавец: {product.User.name}
          </p>
          <p className="text-DarkOceanBlue text-sm">
            ✦{product.User.rating} • {product.User.count_rating} оценок
          </p>
        </div>

        {/* Цена и кнопка оплаты */}
        <div className="flex flex-col items-end">
          <button
            className={`mt-10 px-4 py-2 rounded text-white ${
              isPaid
                ? "bg-MintGreen hover:bg-EmeraldGreen"
                : "bg-DarkSlateBlue hover:bg-DeepTealBlue"
            }`}
            onClick={handlePayment}
          >
            {/* Цена отображается на кнопке */}
            Оплатить:{" "}
            {Number(product.price.toFixed(9)).toLocaleString("en", {
              useGrouping: false,
              maximumFractionDigits: 9,
            })}{" "}
            ETH
          </button>
        </div>
      </div>

      {/* Отображение ошибки */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CartProductCard;
