const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controlers/wishlistController");

const secureMiddleware = require("../middleware/secureMiddleware");

console.log("Wishlist routes loaded");

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Wishlist route working",
  });
});

// Add wishlist
router.post("/add/:productId", secureMiddleware, addToWishlist);

// Get wishlist
router.get("/", secureMiddleware, getWishlist);

// Remove wishlist
router.delete("/remove/:productId", secureMiddleware, removeFromWishlist);

module.exports = router;
