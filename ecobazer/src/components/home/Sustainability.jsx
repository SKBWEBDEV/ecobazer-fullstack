import { Leaf, Recycle, HeartHandshake } from "lucide-react";

export default function Sustainability() {
  return (
    <section id="sustainability" className="px-6 py-10">
      <div
        className="
        max-w-7xl
        mx-auto
        rounded-3xl
        p-8
        md:p-12
        border
        border-emerald-500/20
        bg-cover
        bg-center
        relative
        overflow-hidden
        "
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497250681960-ef046c08a56e)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-3">
              <Leaf className="text-emerald-400" size={32} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Sustainability Promise
            </h2>

            <p className="mt-3 text-gray-200">
              We believe everyday choices can create a better future. EcoBazer
              focuses on responsible products made for everyday living.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-10
            "
          >
            <div
              className="
              rounded-2xl
              bg-black/40
              backdrop-blur-sm
              p-6
              border
              border-white/10
              "
            >
              <Recycle className="text-emerald-400 mb-4" size={30} />

              <h3 className="text-xl font-semibold text-white">
                Eco-friendly Products
              </h3>

              <p className="mt-2 text-sm text-gray-200">
                Carefully selected products with responsible materials and
                better choices.
              </p>
            </div>

            <div
              className="
              rounded-2xl
              bg-black/40
              backdrop-blur-sm
              p-6
              border
              border-white/10
              "
            >
              <Leaf className="text-emerald-400 mb-4" size={30} />

              <h3 className="text-xl font-semibold text-white">
                Sustainable Living
              </h3>

              <p className="mt-2 text-sm text-gray-200">
                Everyday products designed to support a greener lifestyle.
              </p>
            </div>

            <div
              className="
              rounded-2xl
              bg-black/40
              backdrop-blur-sm
              p-6
              border
              border-white/10
              "
            >
              <HeartHandshake className="text-emerald-400 mb-4" size={30} />

              <h3 className="text-xl font-semibold text-white">
                Better Choices
              </h3>

              <p className="mt-2 text-sm text-gray-200">
                Honest pricing and thoughtful products for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
