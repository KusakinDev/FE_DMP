"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с cookies
import { useRouter } from 'next/navigation';
import API_URL from "@/config";

const CreateProductPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append("file", image);
      const token = Cookies.get('token'); // Получаем токен из cookies
      // Загружаем изображение на сервер
      const uploadRes = await axios.post(`${API_URL}/protected/uploadProductImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data.url; // Предполагаем, что сервер вернет объект { url: "https://..." }



      // Формируем JSON с данными товара
      const productData = {
        title,
        description,
        price: Number(price),
        image: imageUrl, // Ссылка на загруженное изображение
      };

      // Отправляем данные товара на сервер
      await axios.post(`${API_URL}/protected/createProductCard`, 
        productData,
        {
            headers: {
              Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
          }
        );

      alert("Product created successfully!");
      router.push('/pages/feed');
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="min-h-screen bg-LightIceBlue flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-PastelBlue p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-DarkOceanBlue text-2xl font-bold mb-4">Новый товар</h1>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-DarkOceanBlue">
            Название
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-DarkAquamarine bg-LightIceBlue mt-1 p-2 w-full rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-DarkOceanBlue"
          >
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="text-DarkAquamarine bg-LightIceBlue mt-1 p-2 w-full rounded-lg"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-DarkOceanBlue">
            Цена
          </label>
          <div className="relative mt-1 w-full">
            <input
              type="number"
              id="price"
              value={price === "" ? "" : Number(price).toFixed(9)}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="text-DarkAquamarine bg-LightIceBlue p-2 w-full pl-16 rounded-lg focus:ring-2 focus:ring-DarkAquamarine outline-none"
              placeholder="0.0"
              min="0"
              step="0.000000001" // Подходит для работы с дробными числами
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-DarkAquamarine font-semibold">
              ETH
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-DarkOceanBlue  ">
            Загрузить фото товара
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            required
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-DarkSlateBlue hover:bg-DeepTealBlue text-white px-4 py-2 rounded-lg"
        >
          Создать (отправить на модерацию)
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
