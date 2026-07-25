import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User, Package, Save } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { getUserById, updateUser } from "../services/userService";
import { getErrorMessage } from "../utils/getErrorMessage";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

import { getMyOrders } from "../services/orderApi";

const tabs = [
  {
    key: "profile",
    label: "Profile",
    icon: User,
  },
  {
    key: "orders",
    label: "Orders",
    icon: Package,
  },
];

const Profile = () => {
  const { user, updateUserData } = useAuth();

  const userId = user?.id || user?._id;

  const [tab, setTab] = useState("profile");

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [orders, setOrders] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load Profile

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await getUserById(userId);

        const profileData = data?.userData || data?.user || data;

        setProfile(profileData);

        reset({
          firstName: profileData?.firstName || "",

          lastName: profileData?.lastName || "",

          email: profileData?.email || "",

          phoneNumber: profileData?.phoneNumber || "",

          billingAddress: {
            street: profileData?.billingAddress?.street || "",
          },
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not load profile"));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, reset]);

  // Load Orders

  const loadOrders = async () => {
    try {
      setOrdersLoading(true);

      const data = await getMyOrders();

      setOrders(data.orders || []);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load orders"));
    } finally {
      setOrdersLoading(false);
    }
  };

  // Update Profile

 const onSubmit = async (values) => {
  setSaving(true);

  try {
    const { data } = await updateUser(userId, values);

    const updatedUser = data.userData;

    setProfile(updatedUser);

    updateUserData(updatedUser);

    toast.success("Profile updated");
  } catch (error) {
    toast.error(getErrorMessage(error, "Could not update profile"));
  } finally {
    setSaving(false);
  }
};

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-2xl font-semibold text-ink-900">My account</h1>

      <div className="mb-8 flex gap-2 border-b border-ink-900/8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setTab(key);

              if (key === "orders") {
                loadOrders();
              }
            }}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
              tab === key
                ? "border-moss-600 text-moss-700"
                : "border-transparent text-ink-900/50"
            }`}
          >
            <Icon size={16} />

            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : tab === "profile" ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-surface max-w-xl space-y-3 p-6"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="First name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <Input
              label="Last name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <Input label="Email address" type="email" {...register("email")} />

          <Input label="Phone number" {...register("phoneNumber")} />

          <Input label="Address" {...register("billingAddress.street")} />

          <Button type="submit" loading={saving} icon={Save}>
            Save changes
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          {ordersLoading ? (
            <Loader />
          ) : orders.length === 0 ? (
            <div className="card-surface p-8 text-center text-sm text-ink-900/50">
              You haven't placed any orders yet.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="card-surface p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      Order #{order._id.slice(-8)}
                    </p>

                    <p className="text-sm text-ink-900/50">
                      Payment: {order.paymentStatus}
                    </p>

                    <p className="text-sm text-ink-900/50">
                      Status: {order.status}
                    </p>
                  </div>

                  <p className="font-bold">৳ {order.totalPrice}</p>
                </div>

                <div className="mt-4 space-y-2">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between border-b py-2"
                    >
                      <span>
                        {item.title} × {item.quantity}
                      </span>

                      <span>৳ {item.totalPrice}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/orders/${order._id}`}
                  className="mt-4 inline-block rounded-lg bg-black px-5 py-2 text-white"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
