import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/api/admin/orders", {
        params: {
          search,
          status,
          paymentStatus,
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
  }, [search, status, paymentStatus]);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/admin/orders/${id}`, {
        status: newStatus,
      });

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading orders...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>

        <p className="text-gray-400">Manage customer orders</p>
      </div>

      <div
        className="
bg-[#242529]
border
border-gray-800
rounded-2xl
p-5
"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order..."
            className="
bg-[#1a1b1f]
border
border-gray-700
rounded-xl
px-4
py-2
text-white
"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
bg-[#1a1b1f]
border
border-gray-700
rounded-xl
px-4
py-2
text-white
"
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
            className="
bg-[#1a1b1f]
border
border-gray-700
rounded-xl
px-4
py-2
text-white
"
          >
            <option value="all">All Payment</option>

            <option value="paid">Paid</option>

            <option value="pending">Pending</option>

            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <p className="text-gray-400">Showing {orders.length} orders</p>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div
            className="
bg-[#242529]
rounded-2xl
p-6
text-center
text-gray-400
"
          >
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="
bg-[#242529]
border
border-gray-800
rounded-2xl
p-6
"
            >
              <div
                className="
flex
justify-between
gap-5
flex-wrap
"
              >
                <div>
                  <h2
                    className="
text-white
font-semibold
"
                  >
                    Order #{order._id.slice(-8)}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Customer: {order.user?.email || "Customer"}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>

                  <p className="text-white mt-2">
                    Total: ৳ {order.totalPrice?.toLocaleString("en-US")}
                  </p>

                  <p className="text-gray-400 text-sm">
                    Payment: {order.paymentStatus}
                  </p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="
bg-[#1a1b1f]
border
border-gray-700
rounded-xl
px-3
py-2
text-white
"
                >
                  <option value="pending">Pending</option>

                  <option value="confirmed">Confirmed</option>

                  <option value="processing">Processing</option>

                  <option value="shipped">Shipped</option>

                  <option value="delivered">Delivered</option>

                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div
                className="
mt-5
border-t
border-gray-800
pt-4
space-y-2
"
              >
{order.products?.map((item, index) => (
  <div
    key={index}
    className="
    flex
    items-center
    gap-4
    bg-[#1a1b1f]
    rounded-xl
    p-3
    "
  >

    <img
 src={
   item.image ||
   item.selectedImage ||
   "https://via.placeholder.com/60"
 }
 alt={item.title}
/>


    <div>
      <p className="text-white font-medium">
        {item.title}
      </p>

      <p className="text-gray-400 text-sm">
        Quantity: {item.quantity}
      </p>

      <p className="text-gray-400 text-sm">
        Price: ৳ {item.price}
      </p>

      <p className="text-gray-400 text-sm">
        Total: ৳ {item.totalPrice}
      </p>

    </div>

  </div>
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
