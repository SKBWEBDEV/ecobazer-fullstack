import { Truck, ShieldCheck, RotateCcw, Leaf } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Tracked shipping with reliable delivery across the country.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Checkout",
      description:
        "Your payments are protected with safe and secure transactions.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description:
        "30-day hassle-free returns for a better shopping experience.",
    },
    {
      icon: Leaf,
      title: "Sustainable Products",
      description: "Thoughtfully selected products for everyday living.",
    },
  ];

  return (
    <section className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why Choose EcoBazer?
          </h2>

          <p className="mt-3 text-gray-400">
            Everything you need for a better shopping experience.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                bg-[#242529]
                rounded-2xl
                p-6
                border
                border-gray-800/60
                hover:border-emerald-500/40
                transition
                "
              >
                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                  mb-4
                  "
                >
                  <Icon size={26} className="text-emerald-400" />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
