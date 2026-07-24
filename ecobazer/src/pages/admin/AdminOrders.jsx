import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [paymentStatus, setPaymentStatus] = useState("all");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/api/admin/orders", {
        params: {
          search,
          status,
          paymentStatus,
          fromDate,
          toDate,
        },
      });

      setOrders(data?.orders || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, status, paymentStatus, fromDate, toDate]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/admin/orders/${id}`, {
        status: newStatus,
      });

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  const resetFilter = () => {
    setSearch("");
    setStatus("all");
    setPaymentStatus("all");
    setFromDate("");
    setToDate("");
  };

  if (loading) {
    return <div className="p-5">Loading orders...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Orders</h1>

      {/* Sticky Filter */}

      <div className="sticky top-0 z-20 bg-sand py-3">
        <div className="card-surface mb-6 p-5">
          <div className="grid gap-4 md:grid-cols-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order, email, product..."
              className="rounded border px-3 py-2"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded border px-3 py-2"
            >
              <option value="all">All Status</option>

              <option value="pending">Pending</option>

              <option value="confirmed">Confirmed</option>

              <option value="processing">Processing</option>

              <option value="shipped">Shipped</option>

              <option value="delivered">Delivered</option>

              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="rounded border px-3 py-2"
            >
              <option value="all">All Payment</option>

              <option value="pending">Pending</option>

              <option value="paid">Paid</option>

              <option value="failed">Failed</option>

              <option value="refunded">Refunded</option>
            </select>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded border px-3 py-2"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded border px-3 py-2"
            />
          </div>

          <button
            onClick={resetFilter}
            className="mt-4 rounded bg-gray-200 px-4 py-2"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Showing {orders.length} orders
      </p>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="card-surface p-6 text-center">No orders found</div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="card-surface p-5">
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="font-semibold">
                    Order #{order._id.slice(-8)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customer: {order.user?.email}
                  </p>

                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    Total: ৳ {order.totalPrice}
                  </p>

                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentStatus}
                  </p>

                  <p className="text-sm text-gray-500">
                    Method: {order.paymentMethod}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="rounded border px-3 py-2"
                >
                  <option value="pending">Pending</option>

                  <option value="confirmed">Confirmed</option>

                  <option value="processing">Processing</option>

                  <option value="shipped">Shipped</option>

                  <option value="delivered">Delivered</option>

                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mt-4 space-y-1">
                {order.products?.map((item, index) => (
                  <p key={index}>
                    {item.title} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
