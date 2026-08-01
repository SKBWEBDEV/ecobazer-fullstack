const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStats,
  replyContact,
  getMyContacts,
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

router.put(
  "/:id/reply",
  secureMiddleware,
  adminMiddleware,
  replyContact
);

router.get(
  "/my",
  secureMiddleware,
  getMyContacts
);

router.delete(
  "/:id",
  secureMiddleware,
  adminMiddleware,
  deleteContact
);

module.exports = router;
