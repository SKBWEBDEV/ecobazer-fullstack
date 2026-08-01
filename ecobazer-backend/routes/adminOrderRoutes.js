const express = require("express");

const router = express.Router();

const secureMiddleware = require("../middleware/secureMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const { getSalesReport } = require("../controlers/reportController");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controlers/adminOrderController");


// Get all orders (Admin)
router.get(
  "/",
  secureMiddleware,
  adminMiddleware,
  getAllOrders
);


// Update order status (Admin)
router.put(
  "/:id",
  secureMiddleware,
  adminMiddleware,
  updateOrderStatus
);


// Sales Report
router.get(
  "/reports/sales",
  secureMiddleware,
  adminMiddleware,
  getSalesReport
);


module.exports = router;