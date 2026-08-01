const Order = require("../model/orderModel");

// Admin Sales Report
exports.getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "firstName lastName email")
      .populate("products.product", "title");

    // Total Orders
    const totalOrders = orders.length;

    // Total Revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    // Order Status Count
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered",
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled",
    ).length;

    // Top Selling Products
    const productSales = {};

    orders.forEach((order) => {
      order.products.forEach((item) => {
        const productName = item.title;

        if (!productSales[productName]) {
          productSales[productName] = 0;
        }

        productSales[productName] += item.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([name, sold]) => ({
        name,
        sold,
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    res.status(200).json({
      success: true,

      report: {
        totalOrders,
        totalRevenue,
        deliveredOrders,
        pendingOrders,
        cancelledOrders,
        topProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
