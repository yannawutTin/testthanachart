import { useEffect, useState, useCallback } from "react";
import { AxiosInstance } from "../config/axios";
import { StockItem } from "../models/product";

export function useGetAllProducts(): {
  products: StockItem[];
  refetch: () => void;
} {
  const [products, setProducts] = useState<StockItem[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await AxiosInstance.get("/stock/all");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  return { products, refetch: fetchProducts };
}
