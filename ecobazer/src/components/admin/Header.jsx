import React from "react";
import { Search, Bell, Menu, SlidersHorizontal, Grid } from "lucide-react";

export default function Header({ onMenuClick }) {
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

        <button
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

          <span
            className="
absolute
top-1 right-1
w-2 h-2
rounded-full
bg-red-500
"
          />
        </button>

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
