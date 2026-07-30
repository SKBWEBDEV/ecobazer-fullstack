import api from "./axios";

// Add product to wishlist
export const addToWishlist = async (productId) => {
  const { data } = await api.post(`/api/wishlist/add/${productId}`);

  return data;
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  const { data } = await api.delete(`/api/wishlist/remove/${productId}`);

  return data;
};

// Get wishlist
export const getWishlist = async () => {
  const { data } = await api.get("/api/wishlist");

  return data;
};
