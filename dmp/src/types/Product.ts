// src/types/Product.ts

export interface Product {
  id: number;
  id_s: number;
  title: string;
  description: string;
  price: number;
  date_pub: string;
  date_buy?: string | null; // date_buy может быть null
  is_buy: boolean;
}
