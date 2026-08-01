const express = require("express");

const router = express.Router();

const {
  getPendingReviews,
  approveReview,
} = require("../controlers/adminReviewController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get Pending Reviews (Admin)
router.get("/", secureMiddleware, adminMiddleware, getPendingReviews);

// Approve Review (Admin)
router.put("/:id/approve", secureMiddleware, adminMiddleware, approveReview);

module.exports = router;
