"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с cookies

const CreateProductPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);

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
      const uploadRes = await axios.post(
        "http://localhost:8080/uploadProductImage",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data.url; // Предполагаем, что сервер вернет объект { url: "https://..." }

      // Получаем id из cookies
      const id = Cookies.get('id'); // Получаем id из cookies

      if (!id) {
        alert("User ID not found in cookies.");
        return;
      }

      // Формируем JSON с данными товара
      const productData = {
        id_s: Number(id),
        title,
        description,
        price: Number(price),
        image: imageUrl, // Ссылка на загруженное изображение
      };

      // Отправляем данные товара на сервер
      await axios.post(
        "http://localhost:8080/createProductCard", 
        productData,
        {
            headers: {
              Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
          }
        );

      alert("Product created successfully!");
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
