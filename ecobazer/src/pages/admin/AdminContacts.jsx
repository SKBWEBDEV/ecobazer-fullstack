import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllContacts, deleteContact } from "../../services/contactService";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const data = await getAllContacts();

      setContacts(data.contacts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);

      setContacts((prev) => prev.filter((item) => item._id !== id));

      toast.success("Message deleted");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>

      {contacts.length === 0 ? (
        <div className="card-surface p-6">No messages found</div>
      ) : (
        <div className="space-y-5">
          {contacts.map((item) => (
            <div key={item._id} className="card-surface p-5">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-sm opacity-70">{item.email}</p>
                </div>

                <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  {item.status}
                </span>
              </div>

              <h4 className="mt-4 font-medium">{item.subject}</h4>

              <p className="mt-2 text-sm opacity-80">{item.message}</p>

              <p className="text-xs mt-3 opacity-60">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-4 text-sm text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
