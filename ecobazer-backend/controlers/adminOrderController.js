const mongoose = require("mongoose");
const Order = require("../model/orderModel");

// ================= GET ALL ORDERS (ADMIN) =================

const getAllOrders = async (req, res) => {
  try {
    const { status, paymentStatus, search, fromDate, toDate } = req.query;

    let filter = {};

    // Status Filter

    if (status && status !== "all") {
      filter.status = status;
    }

    // Payment Status Filter

    if (paymentStatus && paymentStatus !== "all") {
      filter.paymentStatus = paymentStatus;
    }

    // Date Filter

    if (fromDate || toDate) {
      filter.createdAt = {};

      if (fromDate) {
        filter.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        const end = new Date(toDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    let orders = await Order.find(filter)
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });

    // ================= SEARCH =================

    if (search && search.trim() !== "") {
      const keyword = search.trim().toLowerCase();

      orders = orders.filter((order) => {
        const idMatch = order._id
          .toString()
          .toLowerCase()
          .includes(keyword);

        const emailMatch =
          order.user?.email
            ?.toLowerCase()
            .includes(keyword) || false;

        const productMatch =
          order.products?.some((item) =>
            item.title.toLowerCase().includes(keyword)
          ) || false;

        return idMatch || emailMatch || productMatch;
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE ORDER STATUS (ADMIN) =================

const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    let updateData = {};

    // Order Status

    if (status) {
      updateData.status = status;
    }

    // Manual Payment Status

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    // COD হলে Delivered -> Paid

    if (status === "delivered" && order.paymentMethod === "COD") {
      updateData.paymentStatus = "paid";
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
};