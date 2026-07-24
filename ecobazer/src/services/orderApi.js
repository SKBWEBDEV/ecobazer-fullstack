import api from "./axios";

// Get logged in user orders
export const getMyOrders = async () => {
  const { data } = await api.get("/api/orders/my-orders");

  return data;
};

// Get single order details
export const getOrderDetails = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);

  return data;
};
