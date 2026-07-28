import React from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  X,
  Store,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
fixed lg:static inset-y-0 left-0 z-50
w-64 bg-[#1a1b1f]
border-r border-gray-800
flex flex-col p-6
transition-transform duration-300
${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Store size={24} />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Eco<span className="text-emerald-400">Bazer</span>
            </h2>
          </div>

          <button
            className="lg:hidden text-gray-400"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ name, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `
flex items-center gap-3 px-4 py-3 rounded-xl
text-sm font-medium transition
${
  isActive
    ? "bg-purple-600 text-white"
    : "text-gray-400 hover:bg-gray-800 hover:text-white"
}
`
              }
            >
              <Icon size={20} />

              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
