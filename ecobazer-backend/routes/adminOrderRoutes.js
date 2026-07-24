const express = require("express");

const router = express.Router();

const secureMiddleWare = require("../middleware/secureMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controlers/adminOrderController");

// Get all orders (Admin)

router.get("/", secureMiddleWare, adminMiddleware, getAllOrders);

// Update order status (Admin)

router.put("/:id", secureMiddleWare, adminMiddleware, updateOrderStatus);

module.exports = router;
