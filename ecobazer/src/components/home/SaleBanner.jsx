import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

export default function SaleBanner() {
  return (
    <section className="px-6">
      <div
        className="
        max-w-7xl
        mx-auto
        rounded-3xl
        bg-gradient-to-r
        from-emerald-900
        via-green-800
        to-emerald-700
        p-8
        md:p-12
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        border
        border-emerald-500/20
        "
      >
        <div>
          <div className="flex items-center gap-2 text-emerald-200 mb-3">
            <Leaf size={20} />
            <span className="text-sm">EcoBazer Special Offer</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Summer Organic Sale
          </h2>

          <p className="mt-3 text-xl text-emerald-100">
            Up to <span className="font-bold">30% OFF</span>
            <br />
            on selected products
          </p>

          <Link
            to="/offers"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-6
              py-3
              rounded-xl
              bg-white
              text-emerald-700
              font-semibold
              hover:bg-emerald-50
              transition
            "
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>

        <div
          className="
          hidden
          md:flex
          w-52
          h-52
          rounded-full
          bg-white/10
          items-center
          justify-center
          "
        >
          <span className="text-7xl">🌱</span>
        </div>
      </div>
    </section>
  );
}
