import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../../services/axios";

export default function SalesChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const loadSales = async () => {
      try {
        const response = await api.get("/api/admin/orders");

        const orders = response.data?.orders || [];

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const monthlySales = {};

months.forEach((month) => {
  monthlySales[month] = 0;
});

const paidOrders = orders.filter(
  (order) =>
    order.paymentStatus &&
    order.paymentStatus.toLowerCase() === "paid"
);

paidOrders.forEach((order) => {
  const date = new Date(order.createdAt);

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  monthlySales[month] += Number(order.totalPrice || 0);
});

console.log("Total Orders:", orders.length);
console.log("Paid Orders:", paidOrders.length);

        const chartData = months.map((month) => ({
          month,
          sales: monthlySales[month],
        }));

        setSalesData(chartData);
      } catch (error) {
        console.log("Sales chart error:", error);
      }
    };

    loadSales();
  }, []);

  return (
    <div
      className="
      bg-[#242529]
      rounded-2xl
      p-6
      border border-gray-800/60
      "
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">Sales Overview</h3>

        <p className="text-xs text-gray-400">Monthly revenue trends</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />

                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />

            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />

            <Tooltip
              formatter={(value) => [
                `৳ ${value.toLocaleString("en-US")}`,
                "Sales",
              ]}
              contentStyle={{
                backgroundColor: "#1a1b1f",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
