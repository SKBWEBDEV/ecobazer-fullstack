import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/getErrorMessage";
import { getMyOrders } from "../services/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();

        setOrders(data.orders || []);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load orders"));
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-3xl font-semibold text-ink-900">My Orders</h1>

      {orders.length === 0 ? (
        <div className="card-surface p-8 text-center">No orders found</div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="card-surface p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-ink-900/50">Order ID</p>

                  <p className="font-semibold">#{order._id.slice(-8)}</p>
                </div>

                <div>
                  <p className="text-sm text-ink-900/50">Status</p>

                  <span
                    className={`inline-block rounded-full px-4 py-1 text-sm font-medium capitalize ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t pt-5 space-y-2">
                <p>
                  Products:{" "}
                  <span className="font-medium">
                    {order.products?.length || 0}
                  </span>
                </p>

                <p className="font-semibold text-lg">
                  Total: ৳ {order.totalPrice}
                </p>

                {order.createdAt && (
                  <p className="text-sm text-ink-900/50">
                    Ordered Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}

                <Link
                  to={`/orders/${order._id}`}
                  className="inline-block mt-4 rounded-lg bg-black px-5 py-2 text-white transition hover:opacity-80"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
