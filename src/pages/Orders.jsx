import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const userId = 7; // (temporary)

  useEffect(() => {
    getOrders(userId)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <h3 className="font-bold text-lg">
              Order #{order.id}
            </h3>
            <p className="text-gray-600">
              Total: ₹{order.totalAmount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}