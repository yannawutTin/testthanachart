"use client";

import { useCallback, useContext, useState, createContext } from "react";
import Toast from "../components/toast";

type ToastContextType = {
  showToast: (message: string, status: "success" | "error" | "warning") => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastStatus, setToastStatus] = useState<
    "success" | "error" | "warning"
  >("success");

  const showToast = useCallback(
    (message: string, status: "success" | "error" | "warning") => {
      setToastMessage(message);
      setToastStatus(status);
      setTimeout(() => setToastMessage(null), 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <Toast message={toastMessage} status={toastStatus} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
