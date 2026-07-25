const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
  deleteReview,
} = require("../controlers/reviewController");

const secureMiddleware = require("../middleware/secureMiddleware");


// Create Review
router.post(
  "/",
  secureMiddleware,
  createReview
);


// Get Product Reviews
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