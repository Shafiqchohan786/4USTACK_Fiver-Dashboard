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

export default function RevenueChart({ revenueData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (revenueData) {
      // Convert revenueData object to array and sort by date
      const formatted = Object.keys(revenueData)
        .sort((a, b) => {
          const [m1, d1, y1] = a.split("/").map(Number);
          const [m2, d2, y2] = b.split("/").map(Number);
          return new Date(2000 + y1, m1 - 1, d1) - new Date(2000 + y2, m2 - 1, d2);
        })
        .map((date) => {
          const [month, day] = date.split("/").map(Number);
          return {
            date: `${month}/${day}`, // Remove year
            revenue: revenueData[date],
          };
        });

      setChartData(formatted);
    }
  }, [revenueData]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl shadow-lg p-6 w-full max-w-3xl mx-auto mb-6 border border-blue-100">
      <h3 className="font-bold text-2xl mb-6 text-blue-700 text-center">
        📈 Fiverr Revenue Trend (Last 30 Days)
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis
            dataKey="date"
            stroke="#3b82f6"
            tick={{ fontSize: 13, fontWeight: 600 }}
          />
          <YAxis
            stroke="#3b82f6"
            tick={{ fontSize: 13, fontWeight: 600 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid #c7d2fe",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#3b82f6", stroke: "#fff" }}
            activeDot={{ r: 7, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
