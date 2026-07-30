const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controlers/notificationController");

const secureMiddleware = require("../middleware/secureMiddleware");

// Get all user notifications
router.get("/", secureMiddleware, getNotifications);

// Mark notification as read
router.patch("/:id/read", secureMiddleware, markAsRead);

module.exports = router;
