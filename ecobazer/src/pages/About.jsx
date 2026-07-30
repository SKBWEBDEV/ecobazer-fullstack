import { ShieldCheck, Truck, Heart, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white dark:bg-[#111827] text-gray-900 dark:text-white">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-emerald-500">EcoBazer</span>
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          Everyday goods, sourced with a lighter footprint. Thoughtfully made,
          honestly priced.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            EcoBazer was created with a simple idea — making sustainable and
            everyday products accessible for everyone. We believe shopping
            should be better for people and the planet.
          </p>
        </div>

        <div className="h-72 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
            alt="Eco friendly lifestyle"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="
    rounded-3xl
    bg-emerald-500/10
    dark:bg-emerald-500/5
    p-8 md:p-12
    text-center
  "
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>

          <p
            className="
      mt-5
      max-w-3xl
      mx-auto
      text-gray-600
      dark:text-gray-400
      leading-relaxed
    "
          >
            At EcoBazer, our mission is to make sustainable and eco-friendly
            products accessible to everyone. We focus on responsible sourcing,
            quality products, and creating a better shopping experience for a
            healthier planet.
          </p>

          <div
            className="
      mt-8
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    "
          >
            <div
              className="
        p-5
        rounded-2xl
        bg-white
        dark:bg-[#1f2937]
      "
            >
              <h3 className="font-semibold text-lg">🌱 Sustainable Products</h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Carefully selected products with a lower impact on nature.
              </p>
            </div>

            <div
              className="
        p-5
        rounded-2xl
        bg-white
        dark:bg-[#1f2937]
      "
            >
              <h3 className="font-semibold text-lg">♻️ Responsible Shopping</h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Encouraging smarter choices for people and the planet.
              </p>
            </div>

            <div
              className="
        p-5
        rounded-2xl
        bg-white
        dark:bg-[#1f2937]
      "
            >
              <h3 className="font-semibold text-lg">🌍 Better Future</h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Building a greener lifestyle through everyday products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
<section className="max-w-6xl mx-auto px-6 py-12">

  <h2 className="text-3xl md:text-4xl font-bold text-center">
    Our Values
  </h2>

  <p className="
    mt-4
    max-w-2xl
    mx-auto
    text-center
    text-gray-600
    dark:text-gray-400
  ">
    The principles that guide EcoBazer in creating a better
    shopping experience.
  </p>


  <div className="
    mt-10
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
  ">

    <div className="
      p-6
      rounded-2xl
      bg-gray-100
      dark:bg-[#1f2937]
    ">
      <div className="text-3xl mb-4">
        ⭐
      </div>

      <h3 className="text-xl font-semibold">
        Quality First
      </h3>

      <p className="
        mt-2
        text-sm
        text-gray-600
        dark:text-gray-400
      ">
        We focus on providing reliable and carefully selected
        products for everyday needs.
      </p>
    </div>


    <div className="
      p-6
      rounded-2xl
      bg-gray-100
      dark:bg-[#1f2937]
    ">
      <div className="text-3xl mb-4">
        🤝
      </div>

      <h3 className="text-xl font-semibold">
        Customer Trust
      </h3>

      <p className="
        mt-2
        text-sm
        text-gray-600
        dark:text-gray-400
      ">
        We believe in honest service and building long-term
        relationships with our customers.
      </p>
    </div>


    <div className="
      p-6
      rounded-2xl
      bg-gray-100
      dark:bg-[#1f2937]
    ">
      <div className="text-3xl mb-4">
        🌍
      </div>

      <h3 className="text-xl font-semibold">
        Responsible Choices
      </h3>

      <p className="
        mt-2
        text-sm
        text-gray-600
        dark:text-gray-400
      ">
        We encourage smarter choices that support a better
        future.
      </p>
    </div>

  </div>

</section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">
          Start Your Sustainable Shopping Journey
        </h2>

        <Link
          to="/products"
          className="
    inline-block mt-6
    px-6 py-3
    rounded-xl
    bg-emerald-500
    text-white
    hover:bg-emerald-600
    transition
  "
        >
          Explore Products
        </Link>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, text }) => {
  return (
    <div
      className="
      p-6 rounded-2xl
      bg-gray-100
      dark:bg-[#1f2937]
      "
    >
      <div className="text-emerald-500 mb-4">{icon}</div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
};

export default About;
