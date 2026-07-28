import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function ActivityCard({ count = 0 }) {
  return (
    <div
      className="
      bg-[#242529]
      rounded-2xl
      p-6
      border border-gray-800/60
      flex
      flex-col
      justify-between
      "
    >
      <div>
        <div
          className="
          flex
          items-center
          justify-between
          mb-5
          "
        >
          <div
            className="
            p-3
            rounded-xl
            bg-amber-500/10
            text-amber-400
            "
          >
            <AlertTriangle size={24} />
          </div>

          <span
            className="
            text-xs
            font-semibold
            px-3
            py-1
            rounded-full
            bg-amber-500/10
            text-amber-400
            "
          >
            Action Needed
          </span>
        </div>


        <h3
          className="
          text-xl
          font-bold
          text-white
          mb-2
          "
        >
          Inventory Alerts
        </h3>


        <p
          className="
          text-sm
          text-gray-400
          mb-6
          "
        >
          {count} products are currently out of stock and need restocking.
        </p>

      </div>


      <Link
  to="/admin/products?stock=out"
  className="
    inline-flex
    items-center
    gap-2
    mt-4
    px-4
    py-2
    rounded-lg
    bg-amber-500/10
    text-amber-400
    hover:bg-amber-500/20
    transition
  "
>
  Restock Items
</Link>

    </div>
  );
}