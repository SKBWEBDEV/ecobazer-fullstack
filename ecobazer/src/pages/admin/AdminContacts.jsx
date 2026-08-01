import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAllContacts,
  deleteContact,
  markContactAsRead,
  replyContact,
} from "../../services/contactService";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedContact, setSelectedContact] = useState(null);

  const [reply, setReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

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

 const handleViewDetails = async (item) => {
  try {
    const data = await getAllContacts();

    const latestContact = data.contacts.find(
      (contact) => contact._id === item._id,
    );

    if (!latestContact) return;

    if (latestContact.status === "unread") {
      await markContactAsRead(latestContact._id);

      latestContact.status = "read";
    }

    setSelectedContact(latestContact);

    setReply("");
  } catch (error) {
    console.log(error);
  }
};

  const handleReply = async () => {
    try {
      if (!reply.trim()) {
        toast.error("Please write a reply");

        return;
      }

      setReplyLoading(true);

      const data = await replyContact(selectedContact._id, reply);

      setContacts((prev) =>
        prev.map((item) =>
          item._id === selectedContact._id ? data.contact : item,
        ),
      );

      setSelectedContact(data.contact);

      setReply(data.contact.reply || "");

      toast.success("Reply sent successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reply failed");
    } finally {
      setReplyLoading(false);
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

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "replied"
                      ? "bg-green-100 text-green-600"
                      : item.status === "read"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="mt-4 font-medium">{item.subject}</h4>

              <p className="mt-2 text-sm opacity-80">
                {item.message.slice(0, 100)}...
              </p>

              <p className="text-xs mt-3 opacity-60">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleViewDetails(item)}
                  className="text-sm text-purple-500 hover:underline"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="
              bg-white
              dark:bg-[#1a1b1f]
              rounded-2xl
              p-6
              w-full
              max-w-lg
            "
          >
            <h2
              className="
                text-xl
                font-semibold
                mb-5
                text-ink-900
                dark:text-white
              "
            >
              Contact Details
            </h2>

            <div className="space-y-3 text-sm">
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>

              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>

              <p>
                <strong>Subject:</strong> {selectedContact.subject}
              </p>

              <p className="pt-3">
                <strong>Message:</strong>
              </p>

              <p className="opacity-80">{selectedContact.message}</p>

              <div className="mt-5 space-y-3">
                <p className="font-semibold">Conversation:</p>

                {selectedContact.messages?.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl ${
                      msg.sender === "admin"
                        ? "bg-purple-100 dark:bg-purple-900"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {msg.sender === "admin" ? "Admin" : "User"}
                    </p>

                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium mb-2">Reply</p>

              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write reply..."
                className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    dark:bg-[#111]
                  "
              />

              <button
                onClick={handleReply}
                disabled={replyLoading}
                className="
                    mt-3
                    px-5
                    py-2
                    rounded-xl
                    bg-purple-600
                    text-white
                  "
              >
                {replyLoading ? "Sending..." : "Send Reply"}
              </button>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="
                  mt-6
                  px-5
                  py-2
                  rounded-xl
                  bg-purple-600
                  text-white
                "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
