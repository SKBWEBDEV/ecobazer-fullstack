import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // Future: API theke wishlist products ashbe
  const wishlistItems = [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500" size={32} fill="currentColor" />

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div
            className="
              rounded-3xl
              border
              border-gray-200
              dark:border-gray-800
              bg-gray-50
              dark:bg-[#1f2937]
              p-10
              text-center
            "
          >
            <Heart
              size={70}
              className="
                mx-auto
                text-gray-300
                dark:text-gray-600
              "
            />

            <h2
              className="
                mt-5
                text-2xl
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Your wishlist is empty
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-400
              "
            >
              Save your favorite products and find them here later.
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
                hover:bg-emerald-600
                transition
              "
            >
              <ShoppingCart size={18} />
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product._id}
                className="
                  rounded-2xl
                  bg-gray-100
                  dark:bg-[#1f2937]
                  p-5
                "
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="
                    h-48
                    w-full
                    object-cover
                    rounded-xl
                  "
                />

                <h3 className="mt-4 font-semibold text-lg">{product.title}</h3>

                <button
                  className="
                    mt-4
                    w-full
                    py-2
                    rounded-xl
                    bg-emerald-500
                    text-white
                  "
                >
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
