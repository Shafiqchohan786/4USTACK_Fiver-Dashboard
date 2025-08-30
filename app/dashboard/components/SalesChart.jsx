"use client";
import { useEffect, useState } from "react";

export default function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats"); // Fiverr backend route
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        // Month-wise earnings aggregation
        const monthlyEarnings = {};
        json.rows.forEach((item) => {
          const dateObj = item.date ? new Date(item.date) : new Date();
          const month = dateObj.toLocaleString("default", { month: "short" });
          monthlyEarnings[month] = (monthlyEarnings[month] || 0) + (item.earning || 0);
        });

        const formatted = Object.keys(monthlyEarnings).map((month) => ({
          month,
          sales: monthlyEarnings[month],
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching Fiverr sales data:", err);
      }
    };

    fetchData();
  }, []);

  const maxSales = Math.max(...data.map((d) => d.sales || 0), 100);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 300 + 10;
    const y = 100 - (d.sales / maxSales) * 80 + 20;
    return `${x},${y}`;
  });

  const pathD = points.length ? `M${points.join(" L")} L310 120 L10 120 Z` : "";
  const lineD = points.length ? `M${points.join(" L")}` : "";

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl mx-auto border border-gray-100">
      <h3 className="font-bold text-xl text-gray-800 mb-5">Fiverr Sales Overview</h3>
      <div className="h-56 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-gray-100 relative overflow-hidden">
        <svg viewBox="0 0 320 120" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {points.length > 1 && <path d={pathD} fill="url(#lineGradient)" />}
          {points.length > 1 && (
            <path d={lineD} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          )}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].split(",")[0]}
              cy={points[points.length - 1].split(",")[1]}
              r="6"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
      <div className="mt-5 flex justify-between items-center text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span> Earnings Trend
        </span>
        {data.length > 1 && (
          <span className="text-blue-600 font-semibold">
            {(((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100).toFixed(1)}%
            ↑
          </span>
        )}
      </div>
    </div>
  );
}
