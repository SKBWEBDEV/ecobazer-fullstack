import api from "./axios";

export const addReview = (payload) => {
  return api.post("/api/reviews", payload);
};

export const getReviews = (productId) => {
  return api.get(`/api/reviews/${productId}`);
};