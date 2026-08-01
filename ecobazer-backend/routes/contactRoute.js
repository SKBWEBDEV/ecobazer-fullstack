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
  userReplyContact,
} = require("../controlers/contactController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public contact message

router.post("/", createContact);

// Admin stats

router.get("/stats", secureMiddleware, adminMiddleware, getContactStats);

// Admin get all contacts

router.get("/", secureMiddleware, adminMiddleware, getAllContacts);

// Admin mark read

router.patch("/:id/read", secureMiddleware, adminMiddleware, markContactAsRead);

// Admin reply

router.put("/:id/reply", secureMiddleware, adminMiddleware, replyContact);

// User get own support messages

router.get("/my", secureMiddleware, getMyContacts);

// User reply on existing ticket  ⭐ NEW

router.put("/:id/user-reply", secureMiddleware, userReplyContact);

// Admin delete

router.delete("/:id", secureMiddleware, adminMiddleware, deleteContact);

module.exports = router;
