const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controlers/notificationController");


const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controlers/notificationController");

const secureMiddleware = require("../middleware/secureMiddleware");

router.get("/", secureMiddleware, getNotifications);

router.patch("/read", secureMiddleware, markAsRead);

router.delete("/:id", secureMiddleware, deleteNotification);

module.exports = router;
