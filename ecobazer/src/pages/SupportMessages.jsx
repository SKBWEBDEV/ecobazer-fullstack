import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyContacts, userReplyContact } from "../services/contactService";

const SupportMessages = () => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [replyText, setReplyText] = useState("");

  const [sendingId, setSendingId] = useState(null);

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

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      toast.error("Write something");

      return;
    }

    try {
      setSendingId(id);

      const data = await userReplyContact(id, replyText);

      setMessages((prev) =>
        prev.map((item) => (item._id === id ? data.contact : item)),
      );

      setReplyText("");

      toast.success("Reply sent");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reply failed");
    } finally {
      setSendingId(null);
    }
  };

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
                  className="
                text-xs
                px-3
                py-1
                rounded-full
                bg-green-100
                text-green-600
                "
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {item.messages?.map((msg, index) => (
                  <div
  className="
    mt-5
    max-h-80
    overflow-y-auto
    space-y-3
    pr-2
  "
>
  {item.messages?.map((msg, index) => (
    <div
      key={index}
      className={`
        p-3
        rounded-xl
         ${
      msg.sender === "admin"
        ? "bg-purple-100 dark:bg-purple-900"
        : "bg-gray-100 dark:bg-gray-800"
    }
      `}
    >
      <p className="text-sm font-medium">
        {msg.sender === "admin" ? "Admin" : "You"}
      </p>

      <p className="mt-1">{msg.text}</p>
    </div>
  ))}
</div>
                ))}
              </div>

              <div className="mt-5">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  dark:bg-[#111]
                  "
                />

                <button
                  onClick={() => handleReply(item._id)}
                  disabled={sendingId === item._id}
                  className="
                  mt-3
                  px-5
                  py-2
                  rounded-xl
                  bg-purple-600
                  text-white
                  "
                >
                  {sendingId === item._id ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportMessages;
