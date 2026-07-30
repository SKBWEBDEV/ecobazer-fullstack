const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controlers/wishlistController");

const secureMiddleware = require("../middleware/secureMiddleware");

console.log("Wishlist routes loaded");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Wishlist route working",
  });
});

router.post("/add/:productId", (req, res) => {
  console.log("POST ADD WISHLIST HIT");

  res.json({
    success: true,
    productId: req.params.productId,
  });
});

router.get("/", secureMiddleware, getWishlist);

router.delete("/remove/:productId", secureMiddleware, removeFromWishlist);

module.exports = router;
