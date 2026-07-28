import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { getErrorMessage } from "../utils/getErrorMessage";
import toast from "react-hot-toast";

// const PAGE_SIZE = 12;

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();
        const products = response?.data?.data || response?.data?.products || [];

        setAllProducts(products);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load products"));
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const list = new Set(
      allProducts.map((product) => product.category).filter(Boolean),
    );

    return ["all", ...list];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const title = product.title?.toLowerCase() || "";

      const matchSearch = title.includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [allProducts, search, category]);

const products = filteredProducts;

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-semibold text-ink-900 dark:text-white">
        Shop Products
      </h1>

      <p className="mt-1 text-sm text-ink-900/60 dark:text-white/60">
        {filteredProducts.length} products found
      </p>

      <div className="my-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-900/40"
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search product..."
            className="input-field pl-10 w-full"
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="input-field w-full sm:w-48"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-5
        "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center py-10 text-ink-900/50">No products found</p>
      ) : (
        <div
          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-5
        "
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
