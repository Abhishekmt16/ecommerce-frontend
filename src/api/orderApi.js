import api from "./axios";

export const placeOrder = (cart) => {
  return api.post("/api/orders/checkout/7", cart);
};

export const createPaymentOrder = (amount) => {
  return api.post(`/api/payment/create?amount=${amount}`);
};

export const verifyPayment = (paymentData) => {
  return api.post("/api/payment/verify", paymentData);
};

export const getOrders = (userId) => {
  return api.get(`/api/orders/user/${userId}`);
};