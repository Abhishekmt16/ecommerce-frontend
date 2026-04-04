import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = async () => {
    try {
      const res = await placeOrder(cart);
      const message = res.data;

      if (message.includes("LOW")) {
        alert("Order placed successfully!");
        navigate("/");
      } else if (message.includes("MEDIUM")) {
        navigate("/verify-otp", {
          state: { email: localStorage.getItem("email") }
        });
      } else if (message.includes("HIGH")) {
        navigate("/biometric");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 mb-3 shadow"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
          ))}

          <hr className="my-4" />

          <h3 className="text-lg font-bold">
            Total: ₹{total}
          </h3>

          <button
            onClick={handleOrder}
            disabled={cart.length === 0}
            className={`mt-4 px-6 py-3 rounded-lg font-semibold transition ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}