"use client";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/stats"); // Backend route
        const data = await res.json();
        if (data.rows) {
          setRows(data.rows);
        }
      } catch (err) {
        console.error("Failed to fetch Fiverr data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-gray-500 text-lg">
        Loading Fiverr gigs...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full overflow-x-auto">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Fiverr Gigs Data</h3>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100 sticky top-0">
          <tr className="text-left text-gray-500 uppercase tracking-wider">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Gig Title</th>
            <th className="py-3 px-4">Gig ID</th>
            <th className="py-3 px-4">Clicks</th>
            <th className="py-3 px-4">Impressions</th>
            <th className="py-3 px-4">Orders</th>
            <th className="py-3 px-4">Completed</th>
            <th className="py-3 px-4">Pending</th>
            <th className="py-3 px-4">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr
              key={r.id || idx}
              className={`border-b hover:bg-blue-50 transition ${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-2 px-4">{r.date || "-"}</td>
              <td className="py-2 px-4">{r.gigTitle || "-"}</td>
              <td className="py-2 px-4">{r.client || "-"}</td>
              <td className="py-2 px-4">{r.clicks ?? "-"}</td>
              <td className="py-2 px-4">{r.impressions ?? "-"}</td>
              <td className="py-2 px-4">{r.orders ?? "-"}</td>
              <td className="py-2 px-4">{r.completed ?? "-"}</td>
              <td className="py-2 px-4">{r.pending ?? "-"}</td>
              <td className="py-2 px-4">${r.earning ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
