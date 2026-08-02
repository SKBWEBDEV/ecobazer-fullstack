import api from "./axios";

// Get all admin notifications
export const getAdminNotifications = async () => {
  const { data } = await api.get("/api/admin/notifications");

  return data;
};

// Get unread count
export const getUnreadAdminNotifications = async () => {
  const { data } = await api.get("/api/admin/notifications/unread-count");

  return data;
};

// Mark single notification read
export const markAdminNotificationRead = async (id) => {
  const { data } = await api.patch(`/api/admin/notifications/${id}/read`);

  return data;
};

// Mark all read
export const markAllAdminNotificationsRead = async () => {
  const { data } = await api.patch("/api/admin/notifications/read-all");

  return data;
};

// Clear all notifications
export const clearAllAdminNotifications = async () => {
  const { data } = await api.delete("/api/admin/notifications/clear/all");

  return data;
};
