const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAsRead,
  deleteNotification,
  clearAllNotifications,
} = require("../controlers/notificationController");

const secureMiddleware = require("../middleware/secureMiddleware");


router.get("/", secureMiddleware, getNotifications);


router.patch("/read", secureMiddleware, markAsRead);


// IMPORTANT: clear route আগে হবে
router.delete(
  "/clear/all",
  secureMiddleware,
  clearAllNotifications
);


// single delete পরে হবে
router.delete(
  "/:id",
  secureMiddleware,
  deleteNotification
);


module.exports = router;