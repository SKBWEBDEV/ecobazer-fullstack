const AdminNotification = require("../model/AdminNotification");

// Get all admin notifications
const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await AdminNotification.find().sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get notifications",
      error: error.message,
    });
  }
};

// Get unread notification count
const getUnreadAdminNotifications = async (req, res) => {
  try {
    const count = await AdminNotification.countDocuments({
      isRead: false,
    });

    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get unread count",
      error: error.message,
    });
  }
};

// Mark single notification as read
const markAdminNotificationRead = async (req, res) => {
  try {
    const notification = await AdminNotification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

// Mark all notifications as read
const markAllAdminNotificationsRead = async (req, res) => {
  try {
    await AdminNotification.updateMany(
      {
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notifications",
      error: error.message,
    });
  }
};

// Delete notification
const deleteAdminNotification = async (req, res) => {
  try {
    const notification = await AdminNotification.findByIdAndDelete(
      req.params.id,
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

// Clear all notifications
const clearAllAdminNotifications = async (req, res) => {
  try {
    await AdminNotification.deleteMany({});

    res.status(200).json({
      message: "All notifications cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear notifications",
      error: error.message,
    });
  }
};




module.exports = {
  getAdminNotifications,
  getUnreadAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
  clearAllAdminNotifications,
};
