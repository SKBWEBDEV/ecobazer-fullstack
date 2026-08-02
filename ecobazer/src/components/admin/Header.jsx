import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, SlidersHorizontal, Grid } from "lucide-react";

import {
  getAdminNotifications,
  markAdminNotificationRead,
} from "../../services/adminNotificationService";

// =========================================================================

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const unreadCount = notifications.filter((item) => !item.isRead).length;


const handleNotificationClick = async (id) => {
  try {
    await markAdminNotificationRead(id);

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isRead: true,
            }
          : item
      )
    );

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAdminNotifications();

        setNotifications(data.notifications || data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <header
      className="
flex items-center justify-between
px-6 py-4
border-b border-gray-800
bg-[#1a1b1f]
sticky top-0 z-30
"
    >
      <div className="flex items-center flex-1 max-w-lg gap-4">
        <button
          onClick={onMenuClick}
          className="
lg:hidden
text-gray-400
hover:text-white
"
        >
          <Menu size={24} />
        </button>

        <div className="relative flex-1">
          <Search
            className="
absolute left-3 top-1/2
-translate-y-1/2
text-gray-500
"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products, orders, users..."
            className="
w-full
pl-10 pr-4 py-2
rounded-full
bg-[#242529]
border border-gray-800
text-gray-200
placeholder-gray-500
text-sm
focus:outline-none
focus:ring-2
focus:ring-purple-600
"
          />
        </div>
      </div>

      <div
        className="
flex items-center gap-3
"
      >
        <button
          className="
p-2
rounded-full
text-gray-400
hover:text-white
hover:bg-gray-800
"
        >
          <SlidersHorizontal size={20} />
        </button>

        <button
          className="
p-2
rounded-full
text-gray-400
hover:text-white
hover:bg-gray-800
"
        >
          <Grid size={20} />
        </button>

        <div className="relative">
          <button
            onClick={async () => {
  setShowNotification(!showNotification);

  if (unreadCount > 0) {
    try {
      await Promise.all(
        notifications
          .filter((item) => !item.isRead)
          .map((item) =>
            markAdminNotificationRead(item._id)
          )
      );

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );

    } catch (error) {
      console.log(error);
    }
  }
}}
            className="
relative
p-2
rounded-full
text-gray-400
hover:text-white
hover:bg-gray-800
"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span
                className="
      absolute
      -top-2
      -right-2
      flex
      h-5
      w-5
      items-center
      justify-center
      rounded-full
      bg-red-500
      text-[10px]
      font-bold
      text-white
    "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotification && (
            <div
              className="
      absolute
      right-0
      mt-3
      w-96
      rounded-xl
      bg-white
      dark:bg-gray-900
      text-gray-900
      dark:text-white
      shadow-xl
      border
      border-gray-200
      dark:border-gray-700
      p-4
      z-50
    "
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="
          font-semibold
          text-gray-900
          dark:text-white
        "
                >
                  Notifications
                </h3>

                {unreadCount > 0 && (
  <span
    className="
      text-xs
      bg-red-500
      text-white
      px-2
      py-1
      rounded-full
    "
  >
    {unreadCount}
  </span>
)}
              </div>

              {notifications.length === 0 ? (
                <p
                  className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
                >
                  No notifications
                </p>
              ) : (
                <div className="space-y-2">
                  {notifications.map((item) => (
                    <div
  key={item._id}
  onClick={async () => {
    await handleNotificationClick(item._id);

    if (item.link) {
      navigate(item.link);
    }
  }}
  className={`
              p-3
              rounded-lg
              border
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
              cursor-pointer
              ${
                !item.isRead
                  ? "bg-gray-100 dark:bg-gray-800 border-purple-500"
                  : "border-gray-200 dark:border-gray-700"
              }
            `}
                    >
                      <div className="flex gap-3">
                        <div
                          className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-100
                  text-purple-600
                  dark:bg-purple-900
                  dark:text-purple-300
                "
                        >
                          🔔
                        </div>

                        <div className="flex-1">
                          <p
                            className="
                    text-sm
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                          >
                            {item.title}
                          </p>

                          <p
                            className="
                    mt-1
                    text-xs
                    text-gray-600
                    dark:text-gray-400
                  "
                          >
                            {item.message}
                          </p>

                          <p
                            className="
                    mt-2
                    text-[11px]
                    text-gray-400
                  "
                          >
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="
ml-2
pl-3
border-l
border-gray-800
"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            alt="Admin"
            className="
w-9 h-9
rounded-full
object-cover
border border-gray-700
"
          />
        </div>
      </div>
    </header>
  );
}
