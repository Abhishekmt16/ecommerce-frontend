import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/jwt";
import { useContext, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const role = getUserRole();
  const token = localStorage.getItem("accessToken");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

return (
  <nav className="bg-gray-900 text-white shadow-md">

    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold text-blue-400">
        SecureCommerce
      </h2>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">

        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link to="/orders" className="hover:text-blue-400">
          Orders
        </Link>

        <Link to="/cart" className="relative hover:text-blue-400">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/checkout" className="hover:text-blue-400">
          Checkout
        </Link>

        {role === "ROLE_ADMIN" && (
          <Link to="/admin" className="text-yellow-400 font-semibold">
            Admin
          </Link>
        )}

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
            className="text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        )}

      </div>

      {/* Mobile Button */}

      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <XMarkIcon className="w-7 h-7" />
        ) : (
          <Bars3Icon className="w-7 h-7" />
        )}
      </button>

    </div>

    {/* Mobile Menu */}

    {menuOpen && (
      <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-gray-800">

        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/orders" onClick={() => setMenuOpen(false)}>
          Orders
        </Link>

        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          Cart ({cart.length})
        </Link>

        <Link to="/checkout" onClick={() => setMenuOpen(false)}>
          Checkout
        </Link>

        {role === "ROLE_ADMIN" && (
          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        ) : (
          <button
            className="text-left text-red-400"
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        )}

      </div>
    )}

  </nav>
);
}