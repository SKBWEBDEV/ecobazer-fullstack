const express = require("express");

const router = express.Router();

const secureMiddleware = require("../middleware/secureMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controlers/adminOrderController");

// Get all orders (Admin)

router.get("/", secureMiddleware, adminMiddleware, getAllOrders);

// Update order status (Admin)

router.put("/:id", secureMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
