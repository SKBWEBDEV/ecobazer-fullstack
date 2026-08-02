import api from "./axios";

export const addToCartApi = (proid, userId, selectedImage) =>
  api.post("/cart", {
    proid,
    userId,
    selectedImage,
  });

export const updateCartQtyApi = (id, type, userId) =>
  api.post(`/cart/update/${id}`, { type, userId });

export const getCartApi = (userId) => api.get(`/cart/${userId}`);

export const removeFromCartApi = (id) => api.delete(`/cart/${id}`);
