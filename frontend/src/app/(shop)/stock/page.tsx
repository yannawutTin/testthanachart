"use client";

import { useState, useEffect } from "react";
import { useGetAllProducts } from "@/app/hook/stockHook";
import { StockItem } from "@/app/models/product";
import { useToast } from "@/app/context/toastContext";
import { useCart } from "@/app/context/CartContext";

export default function Dashboard() {
  const { checkAddToCart, checkoutVersion } = useCart();
  const { showToast } = useToast();
  const { products, refetch } = useGetAllProducts();

  useEffect(() => {
    if (checkoutVersion > 0) refetch();
  }, [checkoutVersion]);

  const [quantityMap, setQuantityMap] = useState<Record<number, number>>({});

  const [added, setAdded] = useState<Record<number, boolean>>({});

  function handleAddToCart(stock: StockItem) {
    const qty = quantityMap[stock.id];
    if (!qty || qty <= 0) {
      showToast("Please enter a valid quantity", "warning");
      return;
    }
    stock.qty = qty;
    checkAddToCart(stock, qty)
      .then(() => {
        setAdded((prev) => ({ ...prev, [stock.id]: true }));
        setTimeout(
          () => setAdded((prev) => ({ ...prev, [stock.id]: false })),
          1200,
        );
      })
      .catch(() => {
        refetch();
        showToast("Failed to add to cart. Qty is not Enough.", "error");
      });
  }

  const handleQtyChange = (productId: number, qty: number) => {
    setQuantityMap((prev) => ({ ...prev, [productId]: qty }));
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 text-xs uppercase tracking-wide">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium text-right">Price</th>
            <th className="px-4 py-3 font-medium text-right">
              QuantityInStock
            </th>
            <th className="px-4 py-3 font-medium w-1/4 ">Quantity</th>
            <th className="px-4 py-3 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products?.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-400">{product.id}</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {product.productName}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                ฿{product.pricePerPiece.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                {product.quantityInStock}
              </td>
              <td className="px-4 py-3 text-gray-500">
                <input
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full "
                  type="number"
                  id={`qty-${product.id}`}
                  step="1"
                  min="1"
                  onKeyDown={(e) => {
                    if (e.key === "." || e.key === ",") e.preventDefault();
                  }}
                  onChange={(e) =>
                    handleQtyChange(product.id, parseInt(e.target.value) || 0)
                  }
                ></input>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    added[product.id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-700"
                  }`}
                >
                  {added[product.id] ? "Added!" : "Add to Cart"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
