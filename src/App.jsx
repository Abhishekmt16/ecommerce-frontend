import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import VerifyOTP from "./pages/VerifyOTP";
import Biometric from "./pages/Biometric";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment"; // ✅ ADD THIS

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Products />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* SECURITY FLOW */}
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/biometric" element={<Biometric />} />

          {/* PAYMENT */}
          <Route path="/payment" element={<Payment />} />

        </Routes>

        {/* TOAST */}
        <ToastContainer position="top-right" autoClose={2000} />

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;