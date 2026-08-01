const express = require("express");

const router = express.Router();

const {
  getPendingReviews,
  approveReview,
} = require("../controlers/adminReviewController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getReviewStats } = require("../controlers/reviewController");

// Get Pending Reviews (Admin)
router.get("/", secureMiddleware, adminMiddleware, getPendingReviews);

// Approve Review (Admin)
router.put("/:id/approve", secureMiddleware, adminMiddleware, approveReview);
// review stats
router.get("/stats", secureMiddleware, adminMiddleware, getReviewStats);

module.exports = router;
