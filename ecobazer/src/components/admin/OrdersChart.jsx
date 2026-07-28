import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/axios";

export default function OrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadOrdersChart = async () => {
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

        const monthlyOrders = {};

        months.forEach((month) => {
          monthlyOrders[month] = {
            completed: 0,
            pending: 0,
          };
        });

        orders.forEach((order) => {
          const date = new Date(order.createdAt);

          const month = date.toLocaleString("en-US", {
            month: "short",
          });

          if (order.status === "delivered") {
            monthlyOrders[month].completed += 1;
          } else {
            monthlyOrders[month].pending += 1;
          }
        });

        const chartData = months.map((month) => ({
          month,
          completed: monthlyOrders[month].completed,
          pending: monthlyOrders[month].pending,
        }));

        setData(chartData);
      } catch (error) {
        console.log("Orders chart error:", error);
      }
    };

    loadOrdersChart();
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
        <h3 className="text-lg font-bold text-white">Orders Analytics</h3>

        <p className="text-xs text-gray-400">Completed vs Pending orders</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />

            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />

            <Tooltip
              contentStyle={{
                background: "#1a1b1f",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="completed"
              name="Completed"
              fill="#9333ea"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="pending"
              name="Pending"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
