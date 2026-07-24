import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Leaf,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

const links = [
  {
    to: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },

  {
    to: "/admin/products",
    label: "Products",
    icon: Package,
  },

  {
    to: "/admin/users",
    label: "Users",
    icon: Users,
  },

  {
    to: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
  },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-sand">
      {/* Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-ink-900 text-white md:flex">
        <div className="flex h-16 items-center gap-2 px-6 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-moss-600">
            <Leaf size={18} />
          </span>
          EcoBazer
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-moss-600 text-white"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={17} />

              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between border-b border-ink-900/8 bg-white px-4 md:hidden">
          <span className="font-display font-semibold">Admin Panel</span>

          <Link to="/" className="text-sm text-moss-700">
            Back to store
          </Link>
        </div>

        <div className="container-app py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
