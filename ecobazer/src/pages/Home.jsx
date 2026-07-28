import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, ShieldCheck, RotateCcw } from "lucide-react";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import SaleBanner from "../components/home/SaleBanner";
import ShopCTA from "../components/home/ShopCTA";
import Sustainability from "../components/home/Sustainability";
import WhyChoose from "../components/home/WhyChoose";



const perks = [
  {
    icon: Leaf,
    title: "Sustainably sourced",
    desc: "Every listing is vetted for materials and origin.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    desc: "Tracked shipping on every order, nationwide.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "Payments are encrypted end-to-end.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    desc: "30-day no-questions-asked returns.",
  },
];

const categories = [
  { name: "Bakery", emoji: "🥖" },
  { name: "Vegetables", emoji: "🥕" },
  { name: "Rice", emoji: "🍚" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Mobile", emoji: "📱" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();

        const list =
          response.data?.data || response.data?.products || response.data || [];

        setProducts(list.slice(0, 8));

        const latestProducts = [...list]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setNewArrivals(latestProducts);
      } catch (error) {
        console.log("Product loading error:", error);

        setProducts([]);
        setNewArrivals([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}

      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-moss-600/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-moss-500/20 blur-3xl" />

        <div className="container-app relative grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center animate-fadeUp">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-moss-300">
              <Leaf size={13} />
              Low-impact, everyday goods
            </span>

            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Shop things that last, from people who care where they came from.
            </h1>

            <p className="mt-5 max-w-md text-white/65">
              EcoBazer curates home, kitchen, and lifestyle products built to be
              used for years, not seasons.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Link to="/products" className="btn-primary px-7 py-3">
                Shop the collection
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/register"
                className="btn-outline !bg-transparent !text-white/85 !border-white/20 px-7 py-3"
              >
                Create an account
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=70&auto=format&fit=crop"
              alt="products"
              className="max-w-md rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Perks */}

      <section className="container-app -mt-10 relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-surface flex gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-50 text-moss-700">
              <Icon size={19} />
            </div>

            <div>
              <p className="font-semibold text-sm">{title}</p>

              <p className="text-xs text-ink-900/55">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}

      <section className="container-app py-16">
        <div className="mb-8 flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured products</h2>

            <p className="text-sm text-ink-900/55">
              Fresh picks from the EcoBazer catalog.
            </p>
          </div>

          <Link to="/products">View all</Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category */}

      <section className="container-app pb-16">
        <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="card-surface p-6 flex flex-col items-center hover:-translate-y-1 transition"
            >
              <span className="text-4xl">{category.emoji}</span>

              <h3 className="font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* {discount} */}

      <SaleBanner />

      {/* New Arrivals */}

      <section className="container-app pb-16">
        <div className="mb-8 flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold">New Arrivals</h2>

            <p className="text-sm text-ink-900/55">
              Latest products added to EcoBazer.
            </p>
          </div>

          <Link to="/products">View all</Link>
        </div>

        {loading ? (
          <Loader />
        ) : newArrivals.length === 0 ? (
          <div className="card-surface p-10 text-center">
            No new products available.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* {Sustainability} */}
      <Sustainability />
      {/* {WhyChoose} */}
      <WhyChoose />
      {/* {ShopCta} */}
      <ShopCTA />


    </div>
  );
};

export default Home;
