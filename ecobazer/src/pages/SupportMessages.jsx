import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyContacts } from "../services/contactService";

const SupportMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await getMyContacts();

      setMessages(data.contacts || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Support Messages</h1>

      {messages.length === 0 ? (
        <div className="card-surface p-6">No support messages found</div>
      ) : (
        <div className="space-y-5">
          {messages.map((item) => (
            <div
              key={item._id}
              className="
                  card-surface
                  p-5
                  rounded-2xl
                  "
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{item.subject}</h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.status === "replied"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-4">
                <p className="font-medium">Your Message:</p>

                <p className="opacity-80 mt-1">{item.message}</p>
              </div>

              {item.reply && (
                <div className="mt-5">
                  <p className="font-medium">Admin Reply:</p>

                  <p className="opacity-80 mt-1">{item.reply}</p>

                  <p className="text-xs opacity-60 mt-2">
                    {new Date(item.repliedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportMessages;
