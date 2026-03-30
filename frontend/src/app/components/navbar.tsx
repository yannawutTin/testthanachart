"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { href: "/stock", label: "Stock" },
  { href: "/products", label: "Products" },
];

export default function Navbar() {
  const { totalItems, setCartOpen } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-gray-900 border-b-2 border-gray-900 pb-0.5"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
