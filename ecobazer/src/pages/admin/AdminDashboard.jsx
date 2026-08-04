import { useEffect, useState } from "react";
import {
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  MailCheck,
  MailOpen,
  Star,
  CheckCircle,
  Clock,
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
import { getContactStats } from "../../services/contactService";
import { getSalesReport } from "../../services/reportService";
import { getReviewStats } from "../../services/reviewService";

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactStats, setContactStats] = useState(null);
  const [reviewStats, setReviewStats] = useState(null);
  const [salesReport, setSalesReport] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");

        setStats(data.data);

        const contactData = await getContactStats();
        setContactStats(contactData.stats);

        const reportData = await getSalesReport();
        setSalesReport(reportData.report);

        const reviewData = await getReviewStats();
        setReviewStats(reviewData.data.stats);
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
        </div>
      </div>

      <div></div>

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
cardBg="bg-blue-100 dark:bg-blue-500/10"
iconBg="bg-blue-200 dark:bg-blue-900"
iconColor="text-blue-900 dark:text-blue-500"
/>

        <StatCard
  title="Total Users"
  value={stats?.totalUsers || 0}
  change="+18%"
  isPositive
  icon={Users}
cardBg="bg-blue-100 dark:bg-blue-500/10"
iconBg="bg-blue-200 dark:bg-blue-900"
iconColor="text-blue-900 dark:text-blue-500"
/>

<StatCard
  title="Total Orders"
  value={stats?.totalOrders || 0}
  change="+24%"
  isPositive
  icon={ShoppingBag}
cardBg="bg-blue-100 dark:bg-blue-500/10"
iconBg="bg-blue-200 dark:bg-blue-900"
iconColor="text-blue-900 dark:text-blue-500"
/>

<StatCard
  title="Revenue"
  value={`৳ ${stats?.totalRevenue?.toLocaleString("en-US") || 0}`}
  change="+15%"
  isPositive
  icon={DollarSign}
cardBg="bg-blue-100 dark:bg-blue-500/10"
iconBg="bg-blue-200 dark:bg-blue-900"
iconColor="text-blue-900 dark:text-blue-500"
/>

<StatCard
  title="Out of Stock"
  value={stats?.outOfStock || 0}
  change="-3%"
  isPositive={false}
  icon={AlertCircle}
cardBg="bg-blue-100 dark:bg-blue-500/10"
iconBg="bg-blue-200 dark:bg-blue-900"
iconColor="text-blue-900 dark:text-blue-500"

/>
      </div>

      {/* Contact Stats */}

      <div
        className="
  grid
  grid-cols-1
  sm:grid-cols-3
  gap-6
  "
      >
        <StatCard
  title="Total Messages"
  value={contactStats?.totalMessages || 0}
  icon={MessageSquare}
  cardBg="bg-cyan-500 dark:bg-cyan-500/20"
  iconBg="bg-cyan-100 dark:bg-cyan-900"
  iconColor="text-cyan-600 dark:text-cyan-400"
/>


<StatCard
  title="Unread Messages"
  value={contactStats?.unreadMessages || 0}
  icon={MailOpen}
  cardBg="bg-red-500 dark:bg-red-500/20"
  iconBg="bg-red-100 dark:bg-red-900"
  iconColor="text-red-600 dark:text-red-400"
/>


<StatCard
  title="Read Messages"
  value={contactStats?.readMessages || 0}
  icon={MailCheck}
  cardBg="bg-green-500 dark:bg-green-500/20"
  iconBg="bg-green-100 dark:bg-green-900"
  iconColor="text-green-600 dark:text-green-400"
/>
      </div>

      {/* Review Stats */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
"
      >

<StatCard
  title="Total Reviews"
  value={reviewStats?.totalReviews || 0}
  icon={Star}
  cardBg="bg-yellow-500 dark:bg-yellow-500/20"
  iconBg="bg-yellow-100 dark:bg-yellow-900"
  iconColor="text-yellow-600 dark:text-yellow-400"
/>


<StatCard
  title="Approved Reviews"
  value={reviewStats?.approvedReviews || 0}
  icon={CheckCircle}
  cardBg="bg-emerald-500 dark:bg-emerald-500/20"
  iconBg="bg-emerald-100 dark:bg-emerald-900"
  iconColor="text-emerald-600 dark:text-emerald-400"
/>


<StatCard
  title="Pending Reviews"
  value={reviewStats?.pendingReviews || 0}
  icon={Clock}
  cardBg="bg-orange-500 dark:bg-orange-500/20"
  iconBg="bg-orange-100 dark:bg-orange-900"
  iconColor="text-orange-600 dark:text-orange-400"
/>


<StatCard
  title="Average Rating"
  value={`⭐ ${reviewStats?.averageRating || 0}`}
  icon={Star}
  cardBg="bg-purple-500 dark:bg-purple-500/20"
  iconBg="bg-purple-100 dark:bg-purple-900"
  iconColor="text-purple-600 dark:text-purple-100"
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

      {/* Top Selling Products */}

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-5">
          Top Selling Products
        </h2>

        <div className="space-y-4">
          {salesReport?.topProducts?.map((product, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-700 pb-3"
            >
              <span className="text-gray-200">
                {index + 1}. {product.name}
              </span>

              <span className="text-green-400 font-semibold">
                {product.sold} Sold
              </span>
            </div>
          ))}
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
