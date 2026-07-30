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
