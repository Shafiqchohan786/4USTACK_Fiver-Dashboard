"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import StatsCard from "./components/StatsCard";
import RevenueChart from "./components/RevenueChart";
import VendorComparison from "./components/VendorComparison";
import DataTable from "./components/DataTable";

export default function DashboardPage() {
  const router = useRouter();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) router.push("/login");
    }

    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStatsData(data);
        else console.error("Failed to load dashboard data.");
      })
      .catch((err) => console.error("Failed to load dashboard data.", err))
      .finally(() => setLoading(false));
  }, [router]);

  // 🟢 Download Excel function
  const handleDownloadExcel = () => {
    if (!statsData?.rows || statsData.rows.length === 0) {
      alert("No data available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(statsData.rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FiverrData");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "fiverr-data.xlsx");
  };

 if (loading)
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <p className="text-blue-600 font-medium text-lg animate-pulse">
        Loading data, please wait...
      </p>
    </div>
  );

  if (!statsData) return <p className="p-6 text-center text-red-500">Failed to load dashboard data.</p>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Upload + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <FileUpload />
          </div>
          <div className="lg:col-span-2">
            <StatsCard
              stats={[
                { title: "Total Clicks", value: statsData.totalClicks, color: "from-blue-400 to-blue-600" },
                { title: "Total Impressions", value: statsData.totalImpressions, color: "from-green-400 to-green-600" },
                { title: "Total Orders", value: statsData.totalOrders, color: "from-purple-400 to-purple-600" },
                { title: "Total Earnings", value: `$${statsData.totalEarnings}`, color: "from-yellow-400 to-yellow-500" },
              ]}
            />
          </div>
        </div>

        {/* Revenue/Earnings Chart */}
        <RevenueChart revenueData={statsData.revenueTrend} title="Monthly Earnings" />

        {/* Vendor Comparison full width */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-md">
          <VendorComparison vendorData={statsData.vendorComparison} title="Earnings by Client" />
        </div>

        {/* Fiverr Data Table full width + Download Button */}
        <div className="bg-white rounded-xl p-5 shadow space-y-4">
          <DataTable rows={statsData.rows || []} />

          <div className="flex justify-end">
            <button
              onClick={handleDownloadExcel}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
            >
              📥 Download Excel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
