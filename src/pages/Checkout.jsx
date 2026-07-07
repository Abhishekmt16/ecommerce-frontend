import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext); // ✅ FIX
  const navigate = useNavigate();

  const [riskLevel, setRiskLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
  setLoading(true);

  try {
    const res = await placeOrder(cart);
    const message = res.data;

      if (message.includes("LOW")) {
        setRiskLevel("LOW");

        clearCart(); // ✅ FIX

        setTimeout(() => {
          navigate("/payment");
        }, 1500);

      } else if (message.includes("MEDIUM")) {
        setRiskLevel("MEDIUM");

        setTimeout(() => {
          navigate("/verify-otp", {
            state: { email: localStorage.getItem("email") }
          });
        }, 1500);

      } else if (message.includes("HIGH")) {
        setRiskLevel("HIGH");

        setTimeout(() => {
          navigate("/biometric");
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg p-4 mb-3 shadow"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="text-lg font-bold">
            Total: ₹{total}
          </h3>

          {/* RISK UI */}
          {riskLevel && (
            <div className="mt-4">
              <p
                className={`text-lg font-bold ${
                  riskLevel === "LOW"
                    ? "text-green-600"
                    : riskLevel === "MEDIUM"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                Risk Level: {riskLevel}
              </p>
            </div>
          )}

          <button
  onClick={handleOrder}
  disabled={cart.length === 0 || loading}
  className={`mt-4 px-6 py-3 rounded-lg font-semibold ${
    cart.length === 0 || loading
      ? "bg-gray-400"
      : "bg-green-500 text-white hover:bg-green-600"
  }`}
>
  {loading ? "Processing..." : "Place Order"}
</button>6
        </>
      )}
    </div>
  );
}