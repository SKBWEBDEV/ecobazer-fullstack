import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  ChevronLeft,
  Star,
  Tag,
  Boxes,
  Hash,
} from "lucide-react";

import toast from "react-hot-toast";

import { getProductById } from "../services/productService";
import { addReview, getReviews } from "../services/reviewService";

import { formatPrice } from "../utils/formatPrice";
import { getErrorMessage } from "../utils/getErrorMessage";

import { useCart } from "../hooks/useCart";

import Loader from "../components/Loader";
import Button from "../components/Button";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1595246140520-2ea3f0a1e1e9?w=700&q=70&auto=format&fit=crop";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);

  const [adding, setAdding] = useState(false);

  // Review states

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [reviewLoading, setReviewLoading] = useState(false);

  // Load Product

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const { data } = await getProductById(id);

        setProduct(data?.data || data?.product || data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load product"));
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Load Reviews

  const loadReviews = async () => {
    try {
      const { data } = await getReviews(id);

      setReviews(data?.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadReviews();
    }
  }, [id]);

  if (loading) {
    return <Loader full />;
  }

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <p>Product not found.</p>

        <Link to="/products" className="mt-4 inline-block text-moss-700">
          Back to shop
        </Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images.map((image) => image.url)
    : [product.image || FALLBACK_IMG];

  const inStock = Number(product.stock) > 0;

  const handleAdd = async () => {
    setAdding(true);

    await addToCart(product._id || product.id);

    setAdding(false);
  };

  // Submit Review

  const handleReviewSubmit = async () => {
    try {
      if (!rating || !comment.trim()) {
        toast.error("Please give rating and comment");

        return;
      }

      setReviewLoading(true);

      await addReview({
        product: product._id,

        rating,

        comment,
      });

      toast.success("Review added successfully");

      setRating(0);

      setComment("");

      loadReviews();
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not add review"));
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="container-app py-10">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-900/55"
      >
        <ChevronLeft size={16} />
        Back to shop
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Product Image */}

        <div>
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
            />
          </div>


          {images.length > 1 && (
  <div className="mt-3 flex gap-3">
    {images.map((img, index) => (
      <button
        key={index}
        onClick={() => setActiveImage(index)}
        className={`
          h-16
          w-16
          overflow-hidden
          rounded-xl
          border-2
          transition
          ${
            activeImage === index
              ? "border-moss-600"
              : "border-transparent"
          }`}>
        <img
          src={img}
          alt={`${product.title}-${index}`}
          className="h-full w-full object-cover"
        />
      </button>
    ))}
  </div>
)}

          
        </div>

        {/* Product Details */}

        <div>
          {product.category && (
            <span className="badge bg-moss-50 text-moss-700">
              {product.category}
            </span>
          )}

          <h1 className="mt-3 text-3xl font-semibold">{product.title}</h1>

          {/* Rating Input */}

          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  size={22}
                  className={
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="mt-2 text-sm">Selected Rating: {rating}</p>
          )}

          {/* Price */}

          <div className="mt-5">
            {product.discountPrice > 0 ? (
              <>
                <p className="text-lg line-through text-ink-900/40">
                  {formatPrice(product.price)}
                </p>

                <p className="text-3xl font-semibold">
                  {formatPrice(product.discountPrice)}
                </p>
              </>
            ) : (
              <p className="text-3xl font-semibold">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <p className="mt-5 text-sm text-ink-900/65">
            {product.description ||
              product.shortDescription ||
              "No description provided for this product."}
          </p>

          {/* Product Info */}

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {product.sku && (
              <div>
                <Hash size={15} />
                SKU: {product.sku}
              </div>
            )}

            {product.brand && (
              <div>
                <Tag size={15} />
                Brand: {product.brand}
              </div>
            )}

            <div>
              <Boxes size={15} />
              Stock:
              {inStock ? `${product.stock} available` : "Out of stock"}
            </div>
          </div>

          <Button
            onClick={handleAdd}
            loading={adding}
            disabled={!inStock}
            icon={ShoppingCart}
            size="lg"
            className="mt-8"
          >
            {inStock ? "Add to cart" : "Out of stock"}
          </Button>

          {/* Write Review */}

          <div className="mt-10 border-t pt-8">
            <h2 className="text-xl font-semibold">Write a Review</h2>

            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star
                    size={26}
                    className={
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="input-field mt-4 min-h-32 w-full"
            />

            <Button
              className="mt-4"
              onClick={handleReviewSubmit}
              loading={reviewLoading}
            >
              Submit Review
            </Button>
          </div>

          {/* Customer Reviews */}

          <div className="mt-10 border-t pt-8">
            <h2 className="text-xl font-semibold">
              Customer Reviews ({reviews.length})
            </h2>

            {reviews.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">No reviews yet</p>
            ) : (
              <div className="mt-5 max-h-[450px] overflow-y-auto space-y-4 pr-2">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-xl border p-4 bg-white shadow-sm"
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-3 text-sm">{review.comment}</p>

                    <p className="mt-2 text-xs text-gray-500">
                      By {review.user?.firstName || "User"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
