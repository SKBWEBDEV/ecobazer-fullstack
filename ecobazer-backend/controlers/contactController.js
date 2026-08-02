const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const Notification = require("../model/notificationModel");
const AdminNotification = require("../model/AdminNotification");
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

  messages: [
    {
      sender: "user",
      text: message,
    },
  ],
});

await AdminNotification.create({
  title: "New Contact Message",

  message: `New message received from ${contact.name}`,

  type: "contacts",

  link: "/admin/contacts",
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

// Get all contacts (Admin)

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
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

// Delete contact

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

// Mark as read

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

    res.status(200).json({
      success: true,

      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Contact stats

const getContactStats = async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();

    const unreadMessages = await Contact.countDocuments({
      status: "unread",
    });

    const readMessages = await Contact.countDocuments({
  status: {
    $in: ["read", "replied"],
  },
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

// Admin reply

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

    contact.messages.push({
      sender: "admin",

      text: reply,
    });

    contact.status = "replied";

    await contact.save();

    const user = await User.findOne({
      email: contact.email,
    });

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

// User support messages

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

// User reply

const userReplyContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,

        message: "Message required",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,

        message: "Contact not found",
      });
    }

    contact.messages.push({
      sender: "user",

      text: message,
    });

    contact.status = "read";

    await contact.save();

    res.status(200).json({
      success: true,

      message: "Reply sent",

      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
  markContactAsRead,
  getContactStats,
  replyContact,
  getMyContacts,
  userReplyContact,
};
