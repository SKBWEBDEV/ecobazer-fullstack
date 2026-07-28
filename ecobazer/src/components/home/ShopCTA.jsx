import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

export default function ShopCTA() {
  return (
    <section className="px-6 py-10">
      <div
        className="
        max-w-7xl
        mx-auto
        rounded-3xl
        bg-gradient-to-br
from-[#111827]
via-[#1f2937]
to-[#064e3b]
        p-8
        md:p-12
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-8
        border border-emerald-500/20
        "
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Leaf size={20} />

            <span className="text-sm">EcoBazer Collection</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to shop better?
          </h2>

          <p className="mt-3 text-gray-400 text-lg max-w-lg">
            Discover sustainable products made for everyday living. Quality
            products, honest prices, and a greener choice.
          </p>

          <Link
            to="/products"
            className="
            inline-flex
            items-center
            gap-2
            mt-6
            px-6
            py-3
            rounded-xl
            bg-emerald-500
            text-white
            font-semibold
            hover:bg-emerald-600
            transition
            "
          >
            Explore Shop
            <ArrowRight size={18} />
          </Link>
        </div>

        <div
          className="
          hidden
          md:flex
          w-44
          h-44
          rounded-full
          bg-emerald-500/10
          border
          border-emerald-500/20
          items-center
          justify-center
          "
        >
          <span className="text-7xl">🌿</span>
        </div>
      </div>
    </section>
  );
}
