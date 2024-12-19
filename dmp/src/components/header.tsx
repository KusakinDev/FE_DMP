// src/components/Header.tsx
"use client";  // Эта директива сообщает Next.js, что компонент должен рендериться на клиенте

import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";  // Иконки из react-icons
import { useRouter } from 'next/navigation';
import Link from "next/link"; // Для навигации между страницами


const Header: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const sellGoods = async () => {
    router.push('/pages/createProductCard');
  }
  const toCart = async () => {
    router.push('/pages/cart');
  }

  return (
    <header className="bg-DarkSlateBlue text-white py-4 sticky top-0 left-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-3">
          <Link href="/pages/feed" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-semibold">Alexander's Digital markerplace</h1>
          </Link>
        </div>

        

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 rounded-lg w-64 bg-gray-700 text-white focus:outline-none"
          />
      
          <button className="p-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500">
            <FaSearch />
          </button>
        </div>

        <button
          onClick={sellGoods}
          className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Продать товар
        </button>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300"
            onClick={toCart}>
            <FaShoppingCart size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
