"use client";

import debounce from "lodash.debounce";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function CartSidebar() {
  const {
    items,
    removeFromCart,
    clearCart,
    totalPrice,
    updateQuantity,
    checkOut,
    cartOpen,
    setCartOpen,
    cartCheckoutResult,
    setCartCheckoutResult,
    lastCheckoutItems,
    insufficientItems,
  } = useCart();

  const insufficientMap = Object.fromEntries(
    insufficientItems.map((i) => [i.productId, i.availableQty]),
  );

  const lastCheckoutTotal = lastCheckoutItems.reduce(
    (sum, i) => sum + i.pricePerPiece * i.quantity,
    0,
  );

  useEffect(() => {
    if (!cartOpen) {
      setCartCheckoutResult(false);
    }
  }, [cartOpen]);

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {cartCheckoutResult ? "Order Summary" : "Shopping Cart"}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          ></button>
        </div>

        {cartCheckoutResult ? (
          /* ── Checkout Result ── */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* success badge */}
            <div className="px-6 pt-5 pb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-sm font-medium text-gray-800">Checkout successful</p>
            </div>

            {/* item list */}
            <div className="flex-1 overflow-y-auto px-6">
              <ul className="divide-y divide-gray-100">
                {lastCheckoutItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-3 gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.quantity} × ฿{item.pricePerPiece.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      ฿{(item.pricePerPiece * item.quantity).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* total + close */}
            <div className="border-t border-gray-100 px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ฿{lastCheckoutTotal.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* ── Cart Items ── */
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {item.productName}
                        </p>
                        <div className="flex gap-2">
                          <p className="text-gray-500 text-xs mt-0.5">
                            ฿{item.pricePerPiece.toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-xs mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        {insufficientMap[item.id] !== undefined && (
                          <p className="text-red-500 text-xs mt-1">
                            Available: {insufficientMap[item.id]}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ฿{(item.pricePerPiece * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
                  onClick={checkOut}
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
