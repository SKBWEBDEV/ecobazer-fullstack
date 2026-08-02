import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CreditCard, Truck } from "lucide-react";

import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

import { createPayment } from "../services/userService";

import { getErrorMessage } from "../utils/getErrorMessage";
import { formatPrice } from "../utils/formatPrice";

import Input from "../components/Input";
import Button from "../components/Button";

const Checkout = () => {
  const { items, totalPrice } = useCart();

  const { user } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
    },
  });

  const [paymentMethod, setPaymentMethod] = useState("AamarPay");

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);

    try {
      const paymentData = {
        cus_name: values.name,

        cus_email: values.email,

        cus_phone: values.phone,

        cus_add1: values.address,

        cus_add2: "",

        cus_city: values.city,

        cus_state: values.state,

        cus_postcode: values.postcode,

        cus_country: values.country,

        paymentMethod,
      };

      const response = await createPayment(paymentData);

      // COD

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully");

        navigate("/orders");

        return;
      }

      // AamarPay

      if (response?.data?.payment?.payment_url) {
        window.location.href = response.data.payment.payment_url;
      } else {
        navigate("/payment/success");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Payment could not be processed."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-app py-10">
      <h1 className="mb-8 text-2xl font-semibold text-ink-900 dark:text-white">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-surface space-y-4 p-6 lg:col-span-2"
        >
          <h2 className="text-lg font-semibold text-ink-900 dark:text-white">
            Shipping details
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <Input
              label="Email address"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>

          <Input
            label="Phone number"
            placeholder="+1 555 000 0000"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Phone is required",
            })}
          />

          <Input
            label="Street address"
            error={errors.address?.message}
            {...register("address", {
              required: "Address is required",
            })}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="City"
              error={errors.city?.message}
              {...register("city", { required: true })}
            />

            <Input
              label="State"
              error={errors.state?.message}
              {...register("state", { required: true })}
            />

            <Input
              label="Postcode"
              error={errors.postcode?.message}
              {...register("postcode", { required: true })}
            />
          </div>

          <Input
            label="Country"
            error={errors.country?.message}
            {...register("country", {
              required: "Country is required",
            })}
          />

          {/* Payment Method */}

          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-ink-900 dark:text-white">Payment Method</h3>

            <label className="flex items-center gap-2 mb-3 text-ink-900 dark:text-white">
              <input
                type="radio"
                value="AamarPay"
                checked={paymentMethod === "AamarPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <CreditCard size={18} />
              AamarPay
            </label>

            <label className="flex items-center gap-2 text-ink-900 dark:text-white">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Truck size={18} />
              Cash on Delivery
            </label>
          </div>

          <Button
            type="submit"
            loading={submitting}
            icon={paymentMethod === "COD" ? Truck : CreditCard}
            className="w-full"
          >
            {paymentMethod === "COD"
              ? `Place Order ${formatPrice(totalPrice)}`
              : `Pay ${formatPrice(totalPrice)}`}
          </Button>
        </form>

        {/* Summary */}

<div className="card-surface h-fit p-6 text-ink-900 dark:text-white">

  <h2 className="mb-4 text-lg font-semibold text-ink-900 dark:text-white">
    Order summary
  </h2>

  <div className="max-h-64 space-y-3 overflow-y-auto ">

    {items.map((item) => {
      const product = item.product || item;

      const qty = item.quantity || item.qty || 1;

      return (
        <div
  key={item._id || item.id}
  className="flex items-center gap-3 text-sm"
>
  <img
    src={
      product.images?.[0]?.url ||
      product.image ||
      "https://via.placeholder.com/60"
    }
    alt={product.title}
    className="h-14 w-14 rounded-lg object-cover"
  />

  <div className="flex-1">
    <p className="text-ink-900 dark:text-white font-medium">
      {product.title || product.name}
    </p>

    <p className="text-gray-500">
      Qty: {qty}
    </p>
  </div>

  <span className="text-ink-900 dark:text-white">
    {formatPrice((product.price ?? item.price ?? 0) * qty)}
  </span>
</div>
      );
    })}
  </div>

<div className="mt-4 flex justify-between border-t pt-4 font-semibold text-ink-900 dark:text-white">
  <span>Total</span>

  <span>{formatPrice(totalPrice)}</span>
</div>
</div>

        
      </div>
    </div>
  );
};

export default Checkout;
