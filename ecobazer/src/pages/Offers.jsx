import { useEffect, useState } from "react";
import api from "../services/axios";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Offers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await api.get("/products");

        console.log("PRODUCT API RESPONSE:", response.data);

        const data = response.data;

        // Handle different API response formats
        const allProducts = data.products || data.data || data || [];

        console.log("ALL PRODUCTS:", allProducts);

        const discountProducts = allProducts.filter((product) => {
          const price = Number(product.price);
          const discountPrice = Number(product.discountPrice);

          return discountPrice && discountPrice < price;
        });

        console.log("DISCOUNT PRODUCTS:", discountProducts);

        setProducts(discountProducts);
      } catch (error) {
        console.log("Offer loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">🔥 Special Offers</h1>

          <p className="mt-2 text-gray-400">
            Discounted products from EcoBazer catalog.
          </p>
        </div>

        {/* Products */}

        {products.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No offer products available.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
            "
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
