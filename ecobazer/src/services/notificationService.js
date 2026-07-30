import api from "./axios";


export const getNotifications = async () => {

  const {data} = await api.get("/api/notifications");

  return data;

};