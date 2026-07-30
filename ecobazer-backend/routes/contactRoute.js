const express = require("express");

const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controlers/contactController");

const secureMiddleware = require("../middleware/secureMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User send contact message
router.post("/", createContact);

// Admin get all messages
router.get("/", secureMiddleware, adminMiddleware, getAllContacts);

// Admin delete message
router.delete("/:id", secureMiddleware, adminMiddleware, deleteContact);

module.exports = router;
