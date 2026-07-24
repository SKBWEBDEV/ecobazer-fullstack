const express = require("express");

const router = express.Router();

const { getAdminStats } = require("../controlers/adminController");

const secureMiddleWare = require("../middleware/secureMiddleWare");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/stats", secureMiddleWare, adminMiddleware, getAdminStats);

module.exports = router;
