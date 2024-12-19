import React, { useState } from 'react';
import { Product } from '@/types/Product';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false); // Состояние для отслеживания добавления в корзину

  const handleAddToCart = () => {
    // Логика добавления в корзину
    setAddedToCart(true); // Устанавливаем состояние в true, чтобы показать, что товар добавлен
  };

  return (
    <div className="bg-PastelBlue rounded-lg shadow-md p-4 relative pb-16">
      {/* Изображение товара */}
      <img
        src={product.image} // Предполагаем, что product.image содержит ссылку на изображение из Cloudinary
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-DarkOceanBlue font-semibold mt-2">{product.title}</h3>
      <p className="text-DarkOceanBlue mt-1">{product.description}</p>

      {/* Кнопка в левом нижнем углу */}
      <button
        className={`absolute left-4 bottom-4 text-GoldenYellow px-4 py-2 rounded bg-DarkSlateBlue hover:bg-DeepTealBlue ${addedToCart ? 'text-CharcoalGray bg-MintGreen hover:bg-EmeraldGreen' : ''}`}
        onClick={handleAddToCart}
      >
        {addedToCart ? 'Добавленно в корзину' : `Купить: ${Number(product.price.toFixed(9)).toLocaleString("en", { 
          useGrouping: false, 
          maximumFractionDigits: 9 
        })} ETH`} {/* Меняем текст в зависимости от состояния */}
      </button>

      {/* Дата публикации в правом нижнем углу */}
      <p className="absolute right-4 bottom-4 text-gray-600 text-sm">
        Дата публикации: {product.date_pub.substring(0, 10)}
      </p>
    </div>
  );
};

export default ProductCard;
