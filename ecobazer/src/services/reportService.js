import api from "./axios";

// Get Admin Sales Report
export const getSalesReport = async () => {
  const { data } = await api.get("/api/admin/orders/reports/sales");

  return data;
};