import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../../services/axios";

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadRevenue = async () => {
      try {
        const response = await api.get("/api/admin/orders");

        const orders = response.data?.orders || [];

        const weeks = {
          W1: 0,
          W2: 0,
          W3: 0,
          W4: 0,
        };

        const paidOrders = orders.filter(
  (order) =>
    order.paymentStatus &&
    order.paymentStatus.toLowerCase() === "paid"
);

paidOrders.forEach((order) => {
  const date = new Date(order.createdAt);

  const day = date.getDate();

  let week;

  if (day <= 7) {
    week = "W1";
  } else if (day <= 14) {
    week = "W2";
  } else if (day <= 21) {
    week = "W3";
  } else {
    week = "W4";
  }

  weeks[week] += Number(order.totalPrice || 0);
});

        setData([
          {
            week: "W1",
            revenue: weeks.W1,
          },
          {
            week: "W2",
            revenue: weeks.W2,
          },
          {
            week: "W3",
            revenue: weeks.W3,
          },
          {
            week: "W4",
            revenue: weeks.W4,
          },
        ]);
      } catch (error) {
        console.log("Revenue chart error:", error);
      }
    };

    loadRevenue();
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
        <h3 className="text-lg font-bold text-white">Revenue Growth</h3>

        <p className="text-xs text-gray-400">Weekly revenue performance</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="week"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />

            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />

            <Tooltip
              formatter={(value) => [
                `৳ ${value.toLocaleString("en-US")}`,
                "Revenue",
              ]}
              contentStyle={{
                background: "#1a1b1f",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{
                fill: "#f59e0b",
                r: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
