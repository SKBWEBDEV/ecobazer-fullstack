import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Leaf,
  Menu,
  X,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
  Moon,
  Sun,
  Bell,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { ThemeContext } from "../context/ThemeContext";

import {
  getNotifications,
  markNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../services/notificationService";




// --------------------------------------------------------------------------------------

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

const clearAll = async () => {
  try {
    await clearAllNotifications();

    setNotifications([]);
    setUnreadCount(0);

  } catch (error) {
    console.log(error);
  }
};




  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();

        const list = data.notifications || [];

        setNotifications(list);

        setUnreadCount(list.filter((item) => !item.isRead).length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

const handleDeleteNotification = async (id) => {
  try {
    console.log("Deleting:", id);

    await deleteNotification(id);

    setNotifications((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );

  } catch (error) {
    console.log(
      "Delete error:",
      error.response?.data || error.message
    );
  }
};
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-moss-600 dark:text-moss-400"
        : "text-ink-900/70 dark:text-white/75 hover:text-moss-600 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-ink-900 text-ink-900 dark:text-white shadow-sm">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-600">
            <Leaf size={18} />
          </span>
          EcoBazer
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </Link>

          <div className="relative">
            <button
              onClick={async () => {
                setShowNotification(!showNotification);

                if (unreadCount > 0) {
                  try {
                    await markNotificationsAsRead();

                    setNotifications((prev) =>
                      prev.map((item) => ({
                        ...item,
                        isRead: true,
                      })),
                    );

                    setUnreadCount(0);
                  } catch (error) {
                    console.log(error);
                  }
                }
              }}
              className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      hover:bg-gray-100
      dark:hover:bg-white/10
      relative
    "
            >
              <Bell size={18} />

              {unreadCount > 0 && (
                <span
                  className="
          absolute
          -right-1
          -top-1
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full
          bg-red-500
          text-[10px]
          text-white
        "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">Notifications</h3>

                  <button onClick={clearAll} className="text-sm text-red-500">
                    Clear All
                  </button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-sm">No notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-b py-2"
                    >
                      <p className="text-sm">{item.message}</p>

                      <button onClick={() => handleDeleteNotification(item._id)}>❌</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-moss-500 text-[10px] font-semibold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="btn-ghost text-ink-900 dark:!text-white/85 hover:bg-gray-100 dark:hover:!bg-white/10 flex-1"
                title={user?.email}
              >
                <User size={16} />

                {user?.firstName ? user.firstName : "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-ghost text-ink-900 dark:!text-white/85 hover:bg-gray-100 dark:hover:!bg-white/10 flex-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn-ghost !text-white/85 hover:!bg-white/10"
              >
                Log in
              </Link>
              <Link to="/register" className="btn-primary">
                Sign up
              </Link>
            </div>
          )}
        </div>

        <button
          className="p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-white dark:bg-ink-900 px-4 pb-5 pt-3 md:hidden animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={linkClass}
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard size={15} /> Admin
                </span>
              </NavLink>
            )}
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-ink-900/80 dark:text-white/85"
            >
              <ShoppingCart size={16} /> Cart{" "}
              {totalItems > 0 && `(${totalItems})`}
            </Link>
            <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="btn-ghost text-ink-900 dark:!text-white/85 hover:bg-gray-100 dark:hover:!bg-white/10"
                    title={user?.email}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost text-ink-900 dark:!text-white/85 hover:bg-gray-100 dark:hover:!bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-ghost text-ink-900 dark:!text-white/85 hover:bg-gray-100 dark:hover:!bg-white/10"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="btn-primary flex-1"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
