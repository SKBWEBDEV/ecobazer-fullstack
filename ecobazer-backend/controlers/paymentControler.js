const axios = require("axios");

const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const User = require("../model/userModel");
const AdminNotification = require("../model/AdminNotification");
// ================= CREATE PAYMENT =================

const paymentControler = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      cus_name,
      cus_email,
      cus_phone,
      cus_add1,
      cus_add2,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      paymentMethod,
    } = req.body;

    if (!cus_name || !cus_email || !cus_phone) {
      return res.status(400).json({
        success: false,

        message: "Customer information required",
      });
    }

    const cart = await Cart.find({
      user: userId,
    }).populate("product");

    if (cart.length === 0) {
      return res.status(404).json({
        success: false,

        message: "Cart is empty",
      });
    }

const products = [];

cart.forEach((item) => {
  if (item.product) {
    products.push({
      product: item.product._id,

      title: item.product.title,

      image:
        item.selectedImage ||
        item.product.images?.find((img)=>img.isMain)?.url ||
        item.product.images?.[0]?.url,

      price: item.product.price,

      sku: item.product.sku,

      quantity: item.quantity,

      totalPrice: item.product.price * item.quantity,
    });
  }
});

    if (products.length === 0) {
      return res.status(400).json({
        success: false,

        message: "No valid product found",
      });
    }

    const totalPrice = products.reduce((sum, item) => sum + item.totalPrice, 0);

    // ================= CASH ON DELIVERY =================
    console.log("Payment Method:", paymentMethod);
    if (paymentMethod === "COD") {
      const order = await Order.create({
        user: userId,

        products,

        totalPrice,

        paymentMethod: "COD",

        paymentStatus: "pending",

        status: "pending",
      });

      const user = await User.findById(userId);

      await AdminNotification.create({
        title: "New Order Received",
        message: `New order placed by ${user.firstName} ${user.lastName}`,
        type: "order",
        link: "/admin/orders",
      });

      await Cart.deleteMany({
        user: userId,
      });

      return res.status(200).json({
        success: true,

        message: "COD order placed successfully",

        orderId: order._id,
      });
    }

    // ================= AAMARPAY =================

    const tran_id = Date.now().toString();

    const order = await Order.create({
      user: userId,

      products,

      totalPrice,

      tranid: tran_id,

      paymentMethod: "AamarPay",

      paymentStatus: "pending",

      status: "pending",
    });

    const paymentData = {
      store_id: process.env.AAMARPAY_STORE_ID,

      signature_key: process.env.AAMARPAY_SIGNATURE_KEY,

      tran_id,

      amount: totalPrice,

      currency: "BDT",

      cus_name,

      cus_email,

      cus_phone,

      cus_add1,

      cus_add2,

      cus_city,

      cus_state,

      cus_postcode,

      cus_country,

      success_url: `${process.env.FRONTEND_URL}/success`,

      fail_url: `${process.env.FRONTEND_URL}/fail`,

      cancel_url: `${process.env.FRONTEND_URL}/cancel`,

      desc: "EcoBazer Product Payment",

      type: "json",
    };

    const response = await axios.post(
      "https://sandbox.aamarpay.com/jsonpost.php",

      paymentData,
    );

    res.status(200).json({
      success: true,

      message: "Payment initiated successfully",

      payment: response.data,

      orderId: order._id,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= PAYMENT SUCCESS =================

const paymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body;

    const order = await Order.findOneAndUpdate(
      {
        tranid: tran_id,
      },

      {
        paymentStatus: "paid",

        status: "confirmed",
      },

      {
        new: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        success: false,

        message: "Order not found",
      });
    }

    await AdminNotification.create({
      title: "New Order Received",
      message: `Payment completed for order #${order._id}`,
      type: "order",
      link: "/admin/orders",
    });

    await Cart.deleteMany({
      user: order.user,
    });

    res.json({
      success: true,

      message: "Payment completed successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  paymentControler,

  paymentSuccess,
};
