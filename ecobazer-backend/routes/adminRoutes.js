const express = require("express");

const router = express.Router();

const { getAdminStats } = require("../controlers/adminController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/stats", secureMiddleware, adminMiddleware, getAdminStats);

module.exports = router;
