"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function VendorComparison() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const res = await fetch("/api/stats"); // Backend route
        const stats = await res.json();

        if (!stats.error && stats.rows) {
          // Group impressions by client
          const groupedData = stats.rows.reduce((acc, row) => {
            acc[row.client] = (acc[row.client] || 0) + row.impressions;
            return acc;
          }, {});

          // Convert into chart-friendly format
          const chartData = Object.entries(groupedData).map(
            ([client, impressions]) => ({
              vendor: client,
              value: impressions,
            })
          );

          setData(chartData);
        }
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      }
    };

    fetchVendorData();
  }, []);

  if (!data.length) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-3xl mx-auto border border-gray-200 text-center text-gray-500">
        Loading vendor comparison...
      </div>
    );
  }

  // Calculate chart width: max 15 bars visible at once, each bar 60px + spacing
  const barWidth = 60;
  const maxVisibleBars = 15;
  const chartWidth =
    data.length > maxVisibleBars ? data.length * barWidth : "100%";

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl p-8 shadow-lg w-full max-w-3xl mx-auto border border-gray-200">
      <h3 className="font-bold text-xl text-gray-800 mb-6 text-center">
        📊 Gigs Comparison by Impressions (Last 7 Days)
      </h3>

      {/* Scrollable container */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: chartWidth, height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="vendor"
                stroke="#6b7280"
                tick={{ fontSize: 13, fontWeight: 600 }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 13, fontWeight: 600 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                itemStyle={{ color: "#111827", fontWeight: "500" }}
                formatter={(value) => `${value} impressions`}
              />
              <Bar
                dataKey="value"
                fill="url(#colorGradient)"
                radius={[12, 12, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
