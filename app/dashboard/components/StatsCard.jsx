"use client";
import { useEffect, useState } from "react";
import { FiUsers, FiShoppingCart, FiActivity, FiDollarSign } from "react-icons/fi";

export default function StatsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (!data.error) setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 mt-52">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-200 rounded-3xl p-10 w-52 md:w-60 lg:w-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center mt-52 text-red-500 text-lg">
        Failed to load stats.
      </div>
    );
  }

  const cards = [
    {
      title: "Total Clicks",
      value: stats.totalClicks,
      color: "from-blue-400 to-blue-600",
      icon: <FiActivity size={28} />,
    },
    {
      title: "Active Vendors",
      value: stats.activeVendors,
      color: "from-green-400 to-green-600",
      icon: <FiUsers size={28} />,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      color: "from-purple-400 to-purple-600",
      icon: <FiShoppingCart size={28} />,
    },
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings}`,
      color: "from-yellow-400 to-yellow-500",
      icon: <FiDollarSign size={28} />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-28">
      {cards.map((s, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-r ${s.color} text-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center justify-center w-52 md:w-60 lg:w-64`}
        >
          <div className="mb-4">{s.icon}</div>
          <h4 className="text-sm md:text-base opacity-90 text-center truncate">
            {s.title}
          </h4>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-center truncate">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
