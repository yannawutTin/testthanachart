"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Product, InsufficientItem } from "../models/product";
import { AxiosInstance } from "../config/axios";
import { useToast } from "./toastContext";
import axios from "axios";

export type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  checkAddToCart: (product: Product, quantity: number) => Promise<void>;
  clearCart: () => void;
  checkOut: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutVersion: number;
  cartCheckoutResult: boolean;
  setCartCheckoutResult: (result: boolean) => void;
  lastCheckoutItems: CartItem[];
  insufficientItems: InsufficientItem[];
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCheckoutResult, setCartCheckoutResult] = useState<boolean>(false);
  const [checkoutVersion, setCheckoutVersion] = useState(0);
  const [lastCheckoutItems, setLastCheckoutItems] = useState<CartItem[]>([]);
  const [insufficientItems, setInsufficientItems] = useState<
    InsufficientItem[]
  >([]);
  const { showToast } = useToast();

  const addToCart = useCallback(
    (product: Product, qty: number) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
          );
        }
        return [...prev, { ...product, quantity: qty }];
      });
    },
    [items],
  );

  const softCheckAddToCart = useCallback(
    async (productId: number, quantity: number) => {
      return AxiosInstance.post(`/stock/add-to-cart`, {
        productId: productId,
        quantity,
      });
    },
    [],
  );

  const checkAddToCart = useCallback(
    async (product: Product, quantity: number) => {
      const cartItem = items.find((i) => i.id === product.id);
      const currentQty = cartItem ? cartItem.quantity : 0;
      try {
        const { data } = await softCheckAddToCart(
          product.id,
          currentQty + quantity,
        );
        if (data.success) {
          addToCart(product, quantity);
        } else {
          throw new Error("Failed to add to cart. Qty is not Enough.");
        }
      } catch (error) {
        throw error;
      }
    },
    [addToCart, items],
  );

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      try {
        const { data } = await softCheckAddToCart(productId, quantity);
        if (!data.success) {
          showToast("Failed to update cart. Qty is not Enough.", "error");
          return;
        }
      } catch (error) {
        showToast("Failed to update cart. Qty is not Enough.", "error");
        return;
      }
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.id !== productId));
      } else {
        setItems((prev) =>
          prev.map((i) => (i.id === productId ? { ...i, quantity } : i)),
        );
      }
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const checkOut = useCallback(async () => {
    try {
      const body = items.map((i) => ({
        productId: i.id,
        quantity: i.quantity,
      }));
      const { data } = await AxiosInstance.post("/stock/checkout", body);
      if (data.success) {
        setLastCheckoutItems(items);
        clearCart();
        setInsufficientItems([]);
        setCartCheckoutResult(true);
        setCheckoutVersion((v) => v + 1);
        showToast("Checkout successful!", "success");
      } else {
        throw new Error(data.message ?? "Checkout failed");
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ??
          "Checkout failed. Qty is not Enough.")
        : error instanceof Error
          ? error.message
          : "Checkout failed";
      const insufficient: InsufficientItem[] = axios.isAxiosError(error)
        ? (error.response?.data?.data ?? [])
        : [];
      setInsufficientItems(insufficient);
      showToast(message, "error");
      throw error;
    }
  }, [items, clearCart]);

  const totalItems = items.length;
  const totalPrice = items.reduce(
    (sum, i) => sum + i.pricePerPiece * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkAddToCart,
        clearCart,
        checkOut,
        totalItems,
        totalPrice,
        cartOpen,
        setCartOpen,
        checkoutVersion,
        cartCheckoutResult,
        setCartCheckoutResult,
        lastCheckoutItems,
        insufficientItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
