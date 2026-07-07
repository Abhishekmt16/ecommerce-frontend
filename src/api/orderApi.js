import api from "./axios";

export const placeOrder = (cart) => {
  return api.post("/api/orders/checkout/7", cart);
};

export const getOrders = (userId) => {
  return api.get(`/api/orders/user/${userId}`);
};