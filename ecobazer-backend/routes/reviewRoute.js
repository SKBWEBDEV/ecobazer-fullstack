const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
  deleteReview,
} = require("../controlers/reviewController");

const secureMiddleWare = require("../middleware/secureMiddleware");


// Create Review
router.post(
  "/",
  secureMiddleWare,
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
  secureMiddleWare,
  deleteReview
);


module.exports = router;