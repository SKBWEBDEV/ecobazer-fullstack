const express = require("express");

const router = express.Router();

const { getNotifications } = require("../controlers/notificationController");

const secureMiddleware = require("../middleware/secureMiddleware");

router.get("/", secureMiddleware, getNotifications);

module.exports = router;
