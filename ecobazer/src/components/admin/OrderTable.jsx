import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/axios";

const statusStyles = {
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",

  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",

  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",

  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await api.get("/api/admin/orders");

        setOrders(data?.orders || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div
      className="
      bg-[#242529]
      rounded-2xl
      p-6
      border border-gray-800/60
      "
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Recent Orders</h3>

          <p className="text-xs text-gray-400">Latest store transactions</p>
        </div>

        <button className="text-gray-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="
            w-full
            text-left
            text-sm
            text-gray-300
            "
          >
            <thead
              className="
              text-xs
              uppercase
              text-gray-500
              border-b
              border-gray-800
              "
            >
              <tr>
                <th className="py-3 px-2">Customer</th>

                <th className="py-3 px-2">Product</th>

                <th className="py-3 px-2">Amount</th>

                <th className="py-3 px-2">Status</th>

                <th className="py-3 px-2 text-right">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="
                    py-8
                    text-center
                    text-gray-400
                    "
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="
                    hover:bg-gray-800/30
                    transition
                    "
                  >
                    <td className="py-4 px-2">
                      <p className="font-medium text-white">
                        {order.user?.firstName || "Customer"}{" "}
                        {order.user?.lastName || ""}
                      </p>

                      <p className="text-xs text-gray-500">
                        {order.user?.email}
                      </p>
                    </td>

                    <td className="py-4 px-2 text-gray-400">
                      {order.products?.[0]?.title || "Product"}
                    </td>

                    <td className="py-4 px-2 font-semibold text-white">
                      ৳ {order.totalPrice?.toLocaleString("en-US")}
                    </td>

                    <td className="py-4 px-2">
                      <span
                        className={`
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        rounded-full
                        border
                        ${statusStyles[order.status]}
                        `}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td
                      className="
                      py-4
                      px-2
                      text-right
                      text-xs
                      text-gray-400
                      "
                    >
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
