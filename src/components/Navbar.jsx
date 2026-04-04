import { Link } from "react-router-dom";
import { getUserRole } from "../utils/jwt";

export default function Navbar() {
  const role = getUserRole();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-400">
        E-Commerce
      </h2>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        <Link to="/checkout" className="hover:text-blue-400">Checkout</Link>

        {role === "ROLE_ADMIN" && (
          <Link to="/admin" className="text-yellow-400 font-semibold">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}