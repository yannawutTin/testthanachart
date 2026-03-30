import Navbar from "../components/navbar";
import CartSidebar from "../components/CartSidebar";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <CartSidebar />
      {children}
    </div>
  );
}
