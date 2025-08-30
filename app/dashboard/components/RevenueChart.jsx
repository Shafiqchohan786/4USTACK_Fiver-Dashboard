"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        const monthlyRevenue = {};
        json.rows.forEach((item) => {
          const dateObj = item.date ? new Date(item.date) : new Date();
          const month = dateObj.toLocaleString("default", { month: "short" });
          monthlyRevenue[month] =
            (monthlyRevenue[month] || 0) + (item.earning || 0);
        });

        const formatted = Object.keys(monthlyRevenue).map((month) => ({
          month,
          revenue: monthlyRevenue[month],
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching Fiverr revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl mx-auto">
      <h3 className="font-semibold text-lg mb-5 text-gray-800">
        Fiverr Revenue Trend
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <defs>
            {/* Gradient for stylish line */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#888"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#888"
            tick={{ fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#lineGradient)" // gradient line
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#3b82f6", stroke: "#fff" }}
            activeDot={{ r: 7, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
