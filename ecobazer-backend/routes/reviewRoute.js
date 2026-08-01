const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
  deleteReview,
  getFeaturedReviews,
} = require("../controlers/reviewController");

const secureMiddleware = require("../middleware/secureMiddleware");


// Create Review
router.post(
  "/",
  secureMiddleware,
  createReview
);


// Home Featured Reviews
router.get(
  "/featured",
  getFeaturedReviews
);


// Product Reviews
router.get(
  "/:productId",
  getProductReviews
);


// Delete Review
router.delete(
  "/:id",
  secureMiddleware,
  deleteReview
);


module.exports = router;