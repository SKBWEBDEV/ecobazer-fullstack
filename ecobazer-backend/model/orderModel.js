const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    // User

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Products

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        sku: {
          type: String,
        },

        quantity: {
          type: Number,
          required: true,
        },

        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    // Total Amount

    totalPrice: {
      type: Number,
      required: true,
    },

    // Online Payment Transaction ID

    tranid: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Order Status

    status: {
      type: String,

      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],

      default: "pending",
    },

    // Payment Status

    paymentStatus: {
      type: String,

      enum: ["pending", "paid", "failed", "refunded"],

      default: "pending",
    },

    // Payment Method

    paymentMethod: {
      type: String,

      enum: ["AamarPay", "COD"],

      default: "AamarPay",
    },

    // Shipping Information

    shippingAddress: {
      fullName: String,

      email: String,

      phone: String,

      street: String,

      city: String,

      state: String,

      postcode: String,

      country: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
