import api from "./axios";

// Users

export const getUsers = () => api.get("/users");

export const getUserById = (id) => api.get(`/users/${id}`);

export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);

export const deleteUser = (id) => api.delete(`/users/${id}`);

// Payment + COD Order

export const createPayment = (payload) =>
  api.post("/api/payment", payload);