import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/jwt";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const role = getUserRole();
  const token = localStorage.getItem("accessToken");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      
      <h2 className="text-2xl font-bold text-blue-400">
        E-Commerce
      </h2>

      <div className="flex gap-6 items-center">
        
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>

        <Link to="/cart" className="relative hover:text-blue-400">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/checkout" className="hover:text-blue-400">Checkout</Link>

        {/* ADMIN */}
        {role === "ROLE_ADMIN" && (
          <Link to="/admin" className="text-yellow-400 font-semibold">
            Admin
          </Link>
        )}

        {/* LOGIN / REGISTER / LOGOUT */}
        {!token ? (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}