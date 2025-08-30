"use client";
import { useEffect, useState } from "react";

export default function ActivityHeatmap() {
  const [dailyActivity, setDailyActivity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats");
        const stats = await res.json();
        if (!stats.error) {
          // stats.dailyActivity = { Sun: 3, Mon: 1, Tue: 2, ... }
          setDailyActivity(stats.dailyActivity);
        }
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchData();
  }, []);

  // Color scale for clicks
  const getColor = (clicks) => {
    if (clicks === 0) return "bg-gray-100";
    if (clicks < 50) return "bg-blue-200";
    if (clicks < 150) return "bg-blue-400";
    return "bg-blue-600 text-white";
  };

  // Weekday order (Monday to Sunday)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md mx-auto">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Daily Activity</h3>

      {/* Weekday Labels */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 justify-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
          <span key={idx} className="w-6 text-center">{d}</span>
        ))}
      </div>

      {/* Heatmap Cells */}
      <div className="grid grid-cols-7 gap-2 justify-items-center">
        {weekdays.map((day) => {
          const clicks = dailyActivity[day] || 0;
          return (
            <div
              key={day}
              className={`h-8 w-8 rounded-md border border-gray-200 ${getColor(clicks)} cursor-pointer transition transform hover:scale-110`}
              title={`${day}: ${clicks} clicks`}
            />
          );
        })}
      </div>
    </div>
  );
}
