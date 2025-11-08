'use client'; // This is crucial for using the store

import { useCartStore } from '@/store/cartStore';

// Simple Cart Icon SVG
function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.121 0 .239.035.348.104l.805 2.414a.25.25 0 0 1-.316.316l-1.878-.528M6.75 19.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3.75-3.75h.008v.008h-.008v-.008Zm0 0H7.5"
      />
    </svg>
  );
}

export default function Header() {
  // Get the 'getTotalItems' function from our store
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#e0e0e0] p-4 shadow-md">
      <div>
        <h1 className="text-3xl font-extrabold text-green-600">Fataak</h1>
      </div>
      <div className="relative">
        <CartIcon />
        {/* Show a badge only if there are items in the cart */}
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </div>
    </nav>
  );
}