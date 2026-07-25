import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

import { getErrorMessage } from "../../utils/getErrorMessage";
import { formatPrice } from "../../utils/formatPrice";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";

const emptyDefaults = {
  title: "",
  price: "",
  discountPrice: "",
  category: "",
  brand: "",
  stock: "",
  sku: "",
  image: "",
  shortDescription: "",
  description: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: emptyDefaults,
  });

  const loadProducts = async () => {
    setLoading(true);

    try {
      const response = await getProducts();

      const products = response.data?.data || [];

      console.log(products[0]);

      setProducts(products);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load products."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreate = () => {
    setEditing(null);
    reset(emptyDefaults);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);

    reset({
      title: product.title || "",
      price: product.price || "",
      discountPrice: product.discountPrice || "",
      category: product.category || "",
      brand: product.brand || "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      image: product.images?.[0]?.url || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
    });

    setModalOpen(true);
  };

  const onSubmit = async (values) => {
    setSaving(true);

    const payload = {
      title: values.title,

      price: Number(values.price),

      discountPrice: Number(values.discountPrice) || 0,

      stock: Number(values.stock),

      category: values.category,

      brand: values.brand,

      sku: values.sku,

      shortDescription: values.shortDescription,

      description: values.description,

      images: [
        {
          url: values.image,
          isMain: true,
        },
      ],
    };

    try {
      if (editing) {
        await updateProduct(editing._id || editing.id, payload);

        toast.success("Product updated");
      } else {
        await createProduct(payload);

        toast.success("Product created");
      }

      setModalOpen(false);

      loadProducts();
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save product."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    setDeletingId(id);

    try {
      await deleteProduct(id);

      toast.success("Product deleted");

      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (error) {
      toast.error(getErrorMessage(error, "Delete failed"));
    } finally {
      setDeletingId(null);
    }
  };

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filtered = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      product.title?.toLowerCase().includes(searchText) ||
      product.brand?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.sku?.toLowerCase().includes(searchText);

    const matchCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    const matchStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.stock > 10) ||
      (stockFilter === "low-stock" &&
        product.stock > 0 &&
        product.stock <= 10) ||
      (stockFilter === "out-stock" && product.stock === 0);

    return matchSearch && matchCategory && matchStock;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Products</h1>

          <p className="mt-1 text-sm text-ink-900/55">
            {products.length} products in your catalog
          </p>
        </div>

        <Button onClick={openCreate} icon={Plus}>
          Add product
        </Button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/35"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input-field pl-10"
        />
      </div>

      <div className="mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field max-w-xs"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="input-field max-w-xs">
          <option value="all">All Stock</option>

          <option value="in-stock">In Stock</option>

          <option value="low-stock">Low Stock</option>

          <option value="out-stock">Out of Stock</option>
        </select>
      </div>

      {loading ? (
        <Loader full />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-ink-900/8">
              <tr>
                <th className="px-5 py-3">Product</th>

                <th className="px-5 py-3">Brand</th>

                <th className="px-5 py-3">Category</th>

                <th className="px-5 py-3">SKU</th>

                <th className="px-5 py-3">Price</th>

                <th className="px-5 py-3">Discount Price</th>

                <th className="px-5 py-3">Stock</th>

                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const id = product._id || product.id;

                  return (
                    <tr key={id}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[0]?.url ||
                              "https://via.placeholder.com/50"
                            }
                            alt={product.title}
                            className="h-10 w-10 rounded object-cover"
                          />

                          <span>{product.title}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3">{product.brand || "—"}</td>

                      <td className="px-5 py-3">{product.category || "—"}</td>

                      <td className="px-5 py-3">{product.sku || "—"}</td>

                      <td className="px-5 py-3">
                        {formatPrice(product.price)}
                      </td>

                      <td className="px-5 py-3">
                        {product.discountPrice > 0
                          ? formatPrice(product.discountPrice)
                          : "—"}
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span>{product.stock}</span>

                          {product.stock === 0 ? (
                            <span className="flex items-center gap-2 text-xs text-red-600">
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              Out of Stock
                            </span>
                          ) : product.stock <= 10 ? (
                            <span className="flex items-center gap-2 text-xs text-yellow-600">
                              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                              Low Stock
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 text-xs text-green-600">
                              <span className="h-2 w-2 rounded-full bg-green-500"></span>
                              In Stock
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-3">
                        <div className="flex gap-3">
                          <button onClick={() => openEdit(product)}>
                            <Pencil size={15} />
                          </button>

                          <button onClick={() => handleDelete(id)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit product" : "Add product"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" {...register("title")} />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Price" type="number" {...register("price")} />

            <Input
              label="Discount Price"
              type="number"
              {...register("discountPrice")}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Stock" type="number" {...register("stock")} />

            <Input label="SKU" {...register("sku")} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Category" {...register("category")} />

            <Input label="Brand" {...register("brand")} />
          </div>

          <Input label="Image URL" {...register("image")} />

          <textarea
            className="input-field w-full"
            rows="3"
            placeholder="Short Description"
            {...register("shortDescription")}
          />

          <textarea
            className="input-field w-full"
            rows="5"
            placeholder="Description"
            {...register("description")}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" loading={saving}>
              {editing ? "Save changes" : "Create product"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProducts;
