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
        <div className="card-surface p-8 text-center">Order not found</div>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-2xl font-semibold text-ink-900">
        Order Details
      </h1>

      <div className="card-surface p-6 space-y-5">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-ink-900/50">Order ID</p>

            <p className="font-semibold">#{order._id}</p>
          </div>

          <div>
            <p className="text-sm text-ink-900/50">Status</p>

            <p className="font-semibold capitalize">{order.status}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">Products</h2>

          <div className="space-y-3">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{item.title}</p>

                  <p className="text-sm text-ink-900/50">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">৳ {item.totalPrice}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {order.tranid}
          </p>

          <p>
            <span className="font-semibold">Total:</span> ৳ {order.totalPrice}
          </p>

          <p className="text-sm text-ink-900/50">
            Ordered Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
