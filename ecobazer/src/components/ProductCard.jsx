import { Link } from "react-router-dom";
import { ShoppingCart, Star, PackageX, Heart } from "lucide-react";

import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../hooks/useCart";
import { addToWishlist } from "../services/wishlistService";



const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1595246140520-2ea3f0a1e1e9?w=500&q=60&auto=format&fit=crop";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const id = product._id || product.id;

  const image = product.images?.length
    ? product.images[0]?.url
    : product.image || FALLBACK_IMG;

  const inStock = Number(product.stock) > 0;

  const rating = product.rating || 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(id);
  };

const handleWishlist = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    await addToWishlist(id);

    alert("Added to wishlist ❤️");
  } catch (error) {
    console.log(error.response?.data);
    console.log(error);

    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <Link
      to={`/products/${id}`}
      className="
      group
      card-surface
      flex
      flex-col
      overflow-hidden
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-soft
      "
    >
      <div className="relative aspect-square overflow-hidden bg-moss-50 dark:bg-ink-700">
        <img
          src={image}
          alt={product.title}
          loading="lazy"
          className="
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-105
          "
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
        />

        {product.category && (
          <span
            className="
            badge
            absolute
            left-3
            top-3
            bg-white/90
            dark:bg-ink-800/90
            text-ink-900
            dark:text-white
            "
          >
            {product.category}
          </span>
        )}

        {!inStock && (
          <span
            className="
            badge
            absolute
            right-3
            top-3
            bg-red-600
            text-white
            "
          >
            <PackageX size={12} />
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && (
          <span
            className="
            text-[11px]
            font-medium
            uppercase
            tracking-wide
            text-moss-700
            dark:text-moss-400
            "
          >
            {product.brand}
          </span>
        )}

        <h3
          className="
          line-clamp-2
          text-sm
          font-semibold
          text-ink-900
          dark:text-white
          "
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-clay-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < Math.round(rating) ? "currentColor" : "none"}
            />
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            {product.discountPrice > 0 ? (
              <>
                <p
                  className="
                  text-xs
                  line-through
                  text-ink-900/40
                  dark:text-white/40
                  "
                >
                  {formatPrice(product.price)}
                </p>

                <p
                  className="
                  text-lg
                  font-semibold
                  text-ink-900
                  dark:text-white
                  "
                >
                  {formatPrice(product.discountPrice)}
                </p>
              </>
            ) : (
              <p
                className="
                text-lg
                font-semibold
                text-ink-900
                dark:text-white
                "
              >
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <button
  onClick={handleWishlist}
  className="
    h-9
    w-9
    rounded-full
    flex
    items-center
    justify-center
    bg-red-500/10
    text-red-500
    hover:bg-red-500
    hover:text-white
    transition
  "
>
  <Heart size={16}/>
</button>

          <button
            onClick={handleAdd}
            disabled={!inStock}
            className="
            btn-primary
            h-9
            w-9
            rounded-full
            p-0
            disabled:opacity-50
            "
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
