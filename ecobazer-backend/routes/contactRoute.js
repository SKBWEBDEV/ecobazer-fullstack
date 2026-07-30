const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStats,
} = require("../controlers/contactController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", createContact);

router.get(
  "/stats",
  secureMiddleware,
  adminMiddleware,
  getContactStats
);

router.get("/", secureMiddleware, adminMiddleware, getAllContacts);

router.patch(
  "/:id/read",
  secureMiddleware,
  adminMiddleware,
  markContactAsRead
);

router.delete(
  "/:id",
  secureMiddleware,
  adminMiddleware,
  deleteContact
);

module.exports = router;
