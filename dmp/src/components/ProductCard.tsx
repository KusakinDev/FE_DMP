// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '@/types/Product';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <p className="text-gray-600 mt-1">${product.price}</p>
      <p className="text-gray-500 mt-1">{product.date_pub}</p>
      <button className="bg-blue-500 text-white mt-3 px-4 py-2 rounded hover:bg-blue-600">
        {product.is_buy ? 'Already Bought' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
