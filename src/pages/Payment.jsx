import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96">

        <h2 className="text-2xl font-bold mb-4">
          Payment Successful
        </h2>

        <p className="text-green-600 mb-4">
          ✅ Your order has been placed successfully!
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          View Orders
        </button>

      </div>
    </div>
  );
}