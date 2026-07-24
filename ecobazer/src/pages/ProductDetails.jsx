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
                  className="h-16 w-16 overflow-hidden rounded-xl"
                >
                  <img src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <span className="badge bg-moss-50 text-moss-700">
              {product.category}
            </span>
          )}

          <h1 className="mt-3 text-3xl font-semibold">{product.title}</h1>

          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} />
            ))}
          </div>

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

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {product.sku && (
              <div>
                <Hash size={15} />
                SKU:
                {product.sku}
              </div>
            )}

            {product.brand && (
              <div>
                <Tag size={15} />
                Brand:
                {product.brand}
              </div>
            )}

            <div>
              <Boxes size={15} />
              Stock:
              <span>
                {inStock ? `${product.stock} available` : "Out of stock"}
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
