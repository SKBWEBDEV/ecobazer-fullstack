import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconBg = "bg-white/10",
  iconColor = "text-white",
  cardBg = "bg-[#242529]",
}) => {
  return (
    <div
      className={`
      ${cardBg}
      rounded-2xl
      p-6
      border
      border-gray-800/60
      shadow-lg
      `}
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className={`
          flex
          items-center
          justify-center
          w-12
          h-12
          rounded-xl
          ${iconBg}
          ${iconColor}
          `}
        >
          {Icon && <Icon size={24} />}
        </div>

        {change && (
          <div
            className={`
            flex
            items-center
            gap-1
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold

            ${
              isPositive
? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
: "bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400"
            }
            `}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}

            {change}
          </div>
        )}
      </div>

      <h2
        className="
  text-3xl
  font-bold
  text-gray-900
  dark:text-white
  "
      >
        {value}
      </h2>

      <p
        className="
  mt-2
  text-sm
  text-gray-900
  dark:text-gray-50
  "
      >
        {title}
      </p>
    </div>
  );
};

export default StatCard;
