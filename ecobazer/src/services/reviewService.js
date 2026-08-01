import api from "./axios";

export const addReview = (payload) => {
  return api.post("/api/reviews", payload);
};

export const getReviews = (productId) => {
  return api.get(`/api/reviews/${productId}`);
};

export const getFeaturedReviews = () => {
  return api.get("/api/reviews/featured");
};

// Admin - Get Pending Reviews
export const getPendingReviews = () => {
  return api.get("/api/admin/reviews");
};

// Admin - Approve Review
export const approveReview = (id) => {
  return api.put(`/api/admin/reviews/${id}/approve`);
};

// Admin - Review Statistics
export const getReviewStats = () => {
  return api.get("/api/admin/reviews/stats");
};