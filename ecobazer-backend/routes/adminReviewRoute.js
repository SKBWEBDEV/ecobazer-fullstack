const express = require("express");
const router = express.Router();

const {
  getPendingReviews,
  approveReview,
} = require("../controlers/adminReviewController");

const {
  getReviewStats,
} = require("../controlers/reviewController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Review Stats
router.get(
  "/stats",
  secureMiddleware,
  adminMiddleware,
  getReviewStats
);


// Get Pending Reviews
router.get(
  "/",
  secureMiddleware,
  adminMiddleware,
  getPendingReviews
);


// Approve Review
router.put(
  "/:id/approve",
  secureMiddleware,
  adminMiddleware,
  approveReview
);


module.exports = router;