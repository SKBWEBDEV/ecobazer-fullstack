const express = require("express");

const router = express.Router();

const {
  getAdminNotifications,
  getUnreadAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
  clearAllAdminNotifications,
} = require("../controlers/adminNotificationController");


const protect = require("../middleware/secureMiddleware");
const admin = require("../middleware/adminMiddleware");

// Get all admin notifications
router.get("/", protect, admin, getAdminNotifications);

// Get unread count
router.get("/unread-count", protect, admin, getUnreadAdminNotifications);

// Mark single notification as read
router.patch("/:id/read", protect, admin, markAdminNotificationRead);

// Mark all notifications as read
router.patch("/read-all", protect, admin, markAllAdminNotificationsRead);

// Delete notification
router.delete("/:id", protect, admin, deleteAdminNotification);

// Clear all notifications
router.delete("/clear/all", protect, admin, clearAllAdminNotifications);

module.exports = router;
