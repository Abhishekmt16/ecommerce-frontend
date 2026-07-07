import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPaymentOrder, paymentSuccess } from "../api/paymentApi";

export default function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const amount = location.state?.amount;
  const email = location.state?.email;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!amount || !email) {
      navigate("/checkout");
    }
  }, [amount, email, navigate]);

  const startPayment = useCallback(async () => {

    setLoading(true);

    try {

      const res = await createPaymentOrder(amount);

      const order = res.data;

      const options = {

        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Secure E-Commerce",
        description: "Order Payment",
        order_id: order.orderId,

        prefill: {
          email: email,
        },

        theme: {
          color: "#2563eb",
        },

        handler: async function () {

          try {

            const response = await paymentSuccess(email);

            if (response.data === "SUCCESS") {

              alert("✅ Payment Successful");

              navigate("/orders");

            } else {

              alert("Payment completed but order was not saved.");

            }

          } catch (err) {

            console.error(err);

            alert("Payment verification failed.");

          }

        }

      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {

        alert("❌ Payment Failed");

        navigate("/checkout");

      });

      razorpay.open();

      setLoading(false);

    } catch (err) {

      console.error(err);

      setLoading(false);

      alert("Unable to start payment");

      navigate("/checkout");

    }

  }, [amount, email, navigate]);

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Secure Payment
        </h2>

        <p className="text-gray-600 mb-2">
          Amount to Pay
        </p>

        <h1 className="text-4xl font-bold text-green-600 mb-6">
          ₹{amount}
        </h1>

        <button
          onClick={startPayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold ${
            loading
              ? "bg-gray-400 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Opening Razorpay..." : "Pay with Razorpay"}
        </button>

        <p className="text-gray-500 mt-4">
          Payments are processed securely using Razorpay Test Mode.
        </p>

      </div>

    </div>

  );

}