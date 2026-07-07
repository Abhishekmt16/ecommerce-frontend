import api from "./axios";

export const createPaymentOrder = (amount) => {
  return api.post(`/api/payment/create?amount=${amount}`);
};

export const paymentSuccess = (email) => {
  return api.post(`/api/payment/success?email=${email}`);
};