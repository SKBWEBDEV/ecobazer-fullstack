import api from "./axios";

// Get all contact messages (Admin)

export const getAllContacts = async () => {
  const { data } = await api.get("/api/contact");

  return data;
};

// Delete contact message (Admin)

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/api/contact/${id}`);

  return data;
};

// Mark contact message as read

export const markContactAsRead = async (id) => {
  const { data } = await api.patch(`/api/contact/${id}/read`);

  return data;
};

// Contact statistics

export const getContactStats = async () => {
  const { data } = await api.get("/api/contact/stats");

  return data;
};

// Admin reply

export const replyContact = async (id, reply) => {
  const { data } = await api.put(`/api/contact/${id}/reply`, {
    reply,
  });

  return data;
};

// Get user's support messages

export const getMyContacts = async () => {
  const { data } = await api.get("/api/contact/my");

  return data;
};

// User reply on support ticket ⭐ NEW

export const userReplyContact = async (id, message) => {
  const { data } = await api.put(`/api/contact/${id}/user-reply`, {
    message,
  });

  return data;
};
