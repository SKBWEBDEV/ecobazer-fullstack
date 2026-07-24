const Product = require("../model/productModel");
const User = require("../model/userModel");
const Order = require("../model/orderModel");

// Admin Dashboard Statistics

const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $match: {
          status: {
            $in: ["paid", "confirmed", "processing", "shipped", "delivered"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const outOfStock = await Product.countDocuments({
      stock: 0,
    });

    res.status(200).json({
      success: true,

      data: {
        totalProducts,

        totalUsers,

        totalOrders,

        totalRevenue,

        outOfStock,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
};
