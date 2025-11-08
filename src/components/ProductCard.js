'use client'; // <-- This is the most important change

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore'; // <-- Import the store

export default function ProductCard({ product }) {
  // Get the 'addToCart' function from our store
  const addToCart = useCartStore((state) => state.addToCart);

  if (!product) {
    return null; // Don't render if no product
  }

  return (
    <div className="flex h-[254px] w-[190px] shrink-0 flex-col justify-between rounded-[50px] bg-[#e0e0e0] p-4 font-sans shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
      {/* Product Image */}
      <div className="relative h-24 w-full">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <h3 className="truncate text-lg font-bold text-gray-800">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.price_unit}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-black">
            ₹{product.our_price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.market_price}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)} // <-- Add the onClick handler
        className="w-full rounded-full bg-green-500 py-2 text-sm font-bold text-white transition-all hover:bg-green-600 active:scale-95"
      >
        ADD
      </button>
    </div>
  );
}