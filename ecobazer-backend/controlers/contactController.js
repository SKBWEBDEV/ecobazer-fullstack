const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const Notification = require("../model/notificationModel");

// Create contact message
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all contact messages (Admin)
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete contact message (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark contact message as read (Admin)
const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status: "read",
      },
      {
        new: true,
      },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Contact statistics (Admin)
const getContactStats = async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();

    const unreadMessages = await Contact.countDocuments({
      status: "unread",
    });

    const readMessages = await Contact.countDocuments({
      status: "read",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalMessages,
        unreadMessages,
        readMessages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin reply contact message

const replyContact = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: "Reply is required",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    contact.reply = reply;

    contact.status = "replied";

    contact.repliedAt = new Date();

    await contact.save();

    // Find registered user by email

    const user = await User.findOne({
      email: contact.email,
    });

    // Send notification

    if (user) {
      await Notification.create({
        user: user._id,

        title: "Support Reply",

        message: "EcoBazer Support replied to your message.",

        type: "system",
      });
    }

    res.status(200).json({
      success: true,

      message: "Reply sent successfully",

      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get user's support messages

const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      email: req.user.email,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================================================
module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStats,
  replyContact,
  getMyContacts,
};