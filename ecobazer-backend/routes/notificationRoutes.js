const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controlers/notificationController");

const secureMiddleware = require("../middleware/secureMiddleware");

// Get user notifications
router.get("/", secureMiddleware, getNotifications);

// Mark all notifications as read
router.patch("/read", secureMiddleware, markAsRead);

module.exports = router;
