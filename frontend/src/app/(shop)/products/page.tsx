"use client";
import { AxiosInstance } from "@/app/config/axios";
import { useToast } from "@/app/context/toastContext";
import { Product } from "@/app/models/product";
import { use, useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await AxiosInstance.get("/product/products");
        const data = await res.data.data;

        setProducts(data);
      } catch (error) {
        showToast("Failed to fetch products", "error");
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 text-xs uppercase tracking-wide">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">productCode</th>
            <th className="px-4 py-3 font-medium text-right">PricePerPiece</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-400">{product.id}</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {product.productName}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {product.productCode}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                ฿{product.pricePerPiece.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
