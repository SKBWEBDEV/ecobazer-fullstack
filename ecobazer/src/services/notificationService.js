import api from "./axios";

export const getNotifications = async () => {
  const { data } = await api.get("/api/notifications");
  return data;
};

// Mark all read

export const markNotificationsAsRead = async () => {
  const { data } = await api.patch("/api/notifications/read");
  return data;
};



export const deleteNotification = (id) =>
  api.delete(`/notifications/${id}`);