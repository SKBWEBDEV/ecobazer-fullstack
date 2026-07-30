import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import { getErrorMessage } from "../utils/getErrorMessage";
import { getOrderDetails } from "../services/orderApi";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderDetails(id);

        setOrder(data.order);
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load order details"));
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <div className="container-app py-10">
        <div className="card-surface p-8 text-center text-ink-900 dark:text-white">
          Order not found
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-2xl font-semibold text-ink-900 dark:text-white">
        Order Details
      </h1>

      <div className="card-surface p-6 space-y-5">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-ink-900/50 dark:text-white/50">
              Order ID
            </p>

            <p className="font-semibold text-ink-900 dark:text-white">
              #{order._id}
            </p>
          </div>

          <div>
            <p className="text-sm text-ink-900/50 dark:text-white/50">Status</p>

            <p className="font-semibold capitalize text-ink-900 dark:text-white">
              {order.status}
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-ink-900 dark:text-white">
            Products
          </h2>

          <div className="space-y-3">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b border-ink-900/10 dark:border-white/10 pb-3"
              >
                <div>
                  <p className="font-medium text-ink-900 dark:text-white">
                    {item.title}
                  </p>

                  <p className="text-sm text-ink-900/50 dark:text-white/50">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-ink-900 dark:text-white">
                  ৳ {item.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-ink-900/10 dark:border-white/10 pt-4 space-y-2">
          <p className="text-ink-900 dark:text-white">
            <span className="font-semibold">Payment:</span>{" "}
            {order.paymentStatus || order.payment || "pending"}
          </p>

          <p className="text-ink-900 dark:text-white">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {order.tranid || "N/A"}
          </p>

          <p className="text-ink-900 dark:text-white">
            <span className="font-semibold">Total:</span> ৳ {order.totalPrice}
          </p>

          <p className="text-sm text-ink-900/50 dark:text-white/50">
            Ordered Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
