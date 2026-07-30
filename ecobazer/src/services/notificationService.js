import api from "./axios";

export const getNotifications = async () => {
  const { data } = await api.get("/api/notifications");
  return data;
};

export const markNotificationsAsRead = async () => {
  const { data } = await api.patch("/api/notifications/read");
  return data;
};

export const deleteNotification = async (id) => {
  console.log("DELETE ID:", id);

  const { data } = await api.delete(
    `/api/notifications/${id}`
  );

  return data;
};


export const clearAllNotifications = async () => {
  const { data } = await api.delete(
    "/api/notifications/clear/all"
  );

  return data;
};