import { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/axios";
import Loader from "../../components/Loader";
import { getErrorMessage } from "../../utils/getErrorMessage";

import StatCard from "../../components/admin/StatCard";
import SalesChart from "../../components/admin/SalesChart";
import OrdersChart from "../../components/admin/OrdersChart";
import RevenueChart from "../../components/admin/RevenueChart";
import OrderTable from "../../components/admin/OrderTable";
import ActivityCard from "../../components/admin/ActivityCard";

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");

        setStats(data.data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load dashboard"));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
{/* Page Header */}

<div>
  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
    <span>EcoBazer</span>

    <span>/</span>

    <span className="text-purple-400">Dashboard</span>
  </div>

  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-white">
        eCommerce Overview
      </h1>

      <p className="mt-1 text-gray-400">
        A quick snapshot of your store performance.
      </p>
    </div>

    {/* Back to Store Button */}
    <Link
      to="/"
      className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        bg-purple-500/10
        text-purple-400
        border border-purple-500/20
        hover:bg-purple-500/20
        transition
      "
    >
      <ArrowLeft size={18} />
      Back to Store
    </Link>
  </div>
</div>

  {/* Back to Store Button */}
<div>

  <div className="mt-4">
    <Link
      to="/"
      className="
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        bg-purple-500/10
        text-purple-400
        border border-purple-500/20
        hover:bg-purple-500/20
        transition
      "
    >
      <ArrowLeft size={18} />
      Back to Store
    </Link>
  </div>

</div>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-5
        gap-6
        "
      >
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          change="+12%"
          isPositive
          icon={Package}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />

        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change="+18%"
          isPositive
          icon={Users}
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />

        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          change="+24%"
          isPositive
          icon={ShoppingBag}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />

        <StatCard
          title="Revenue"
          value={`৳ ${stats?.totalRevenue?.toLocaleString("en-US") || 0}`}
          change="+15%"
          isPositive
          icon={DollarSign}
          iconBg="bg-amber-500/10"
          iconColor="text-amber-400"
        />

        <StatCard
          title="Out of Stock"
          value={stats?.outOfStock || 0}
          change="-3%"
          isPositive={false}
          icon={AlertCircle}
          iconBg="bg-rose-500/10"
          iconColor="text-rose-400"
        />
      </div>

      {/* Charts */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <div>
          <OrdersChart />
        </div>
      </div>

      {/* Revenue + Alert */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        "
      >
        <div className="xl:col-span-1">
          <RevenueChart />
        </div>

        <div className="xl:col-span-2">
          <ActivityCard count={stats?.outOfStock || 0} />
        </div>
      </div>

      {/* Recent Orders */}

      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
