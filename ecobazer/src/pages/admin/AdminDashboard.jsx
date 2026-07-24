import { useEffect, useState } from "react";
import { Package, Users, ShoppingBag, DollarSign, Boxes } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/axios";
import Loader from "../../components/Loader";
import { getErrorMessage } from "../../utils/getErrorMessage";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");

        setStats(response.data.data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load dashboard"));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <Loader full />;
  }

  const cards = [
    {
      label: "Total products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-moss-50 text-moss-700",
    },

    {
      label: "Registered users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-clay-400/15 text-clay-500",
    },

    {
      label: "Total orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },

    {
      label: "Total revenue",
      value: `৳ ${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },

    {
      label: "Out of stock",
      value: stats?.outOfStock || 0,
      icon: Boxes,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink-900">Overview</h1>

        <p className="mt-1 text-sm text-ink-900/55">
          A quick snapshot of your store.
        </p>
      </div>

      <div
        className="
      grid 
      gap-4 
      sm:grid-cols-2 
      lg:grid-cols-5
      "
      >
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card-surface p-6">
            <span
              className={`
              flex 
              h-10 
              w-10 
              items-center 
              justify-center 
              rounded-xl 
              ${color}
              `}
            >
              <Icon size={19} />
            </span>

            <p className="mt-4 text-3xl font-semibold text-ink-900">{value}</p>

            <p className="mt-1 text-sm text-ink-900/55">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card-surface p-6">
        <p className="text-sm text-ink-900/60">
          Manage your catalog from
          <strong className="text-ink-900"> Products</strong> and manage
          accounts from
          <strong className="text-ink-900"> Users</strong> in the sidebar.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
