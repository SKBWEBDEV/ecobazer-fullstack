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
  const { data } = await api.patch(
    `/api/contact/${id}/read`
  );

  return data;
};


export const getContactStats = async () => {
  const { data } = await api.get(
    "/api/contact/stats"
  );

  return data;
};


export const replyContact = async (id, reply) => {
  const { data } = await api.put(
    `/api/contact/${id}/reply`,
    {
      reply,
    }
  );

  return data;
};


export const getMyContacts = async () => {
  const { data } = await api.get("/api/contact/my");

  return data;
};