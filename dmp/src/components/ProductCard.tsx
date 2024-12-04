import React, { useState } from 'react';
import { Product } from '@/types/Product';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false); // Состояние для отслеживания добавления в корзину

  const handleAddToCart = () => {
    // Логика добавления в корзину
    setAddedToCart(true); // Устанавливаем состояние в true, чтобы показать, что товар добавлен
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 relative pb-16">
      {/* Изображение товара */}
      <img
        src={product.image} // Предполагаем, что product.image содержит ссылку на изображение из Cloudinary
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-gray-700 font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 mt-1">{product.description}</p>

      {/* Кнопка в левом нижнем углу */}
      <button
        className={`absolute left-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${addedToCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
        onClick={handleAddToCart}
      >
        {addedToCart ? 'Добавленно в корзину' : `Купить: ${product.price} ETH`} {/* Меняем текст в зависимости от состояния */}
      </button>

      {/* Дата публикации в правом нижнем углу */}
      <p className="absolute right-4 bottom-4 text-gray-600 text-sm">
        Дата публикации: {product.date_pub.substring(0, 10)}
      </p>
    </div>
  );
};

export default ProductCard;
