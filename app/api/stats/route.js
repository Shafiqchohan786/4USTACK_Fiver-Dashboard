import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30); // last 30 days

    // Helper: DB date (m/d/yy) ko JS Date me convert karo
    const parseDbDate = (str) => {
      const parts = str.split("/");
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1; // 0-based
        const day = parseInt(parts[1], 10);
        const year = 2000 + parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
      return null;
    };

    // Fetch all rows
    const allData = await prisma.fiverrData.findMany({
      orderBy: { date: "asc" },
    });

    // Filter last 7 days for clicks/impressions/orders
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const recentData = allData.filter((r) => {
      const dbDate = parseDbDate(r.date);
      return dbDate && dbDate >= sevenDaysAgo && dbDate <= today;
    });

    // Stats calculation for recent data
    const totalClicks = recentData.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const totalImpressions = recentData.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const totalOrders = recentData.reduce((sum, r) => sum + (r.orders || 0), 0);

    // Total earnings for 30-day revenue trend
    const revenueData = allData.filter((r) => {
      const dbDate = parseDbDate(r.date);
      return dbDate && dbDate >= thirtyDaysAgo && dbDate <= today;
    });

    const totalEarnings = revenueData.reduce((sum, r) => sum + (r.earning || 0), 0);
    const revenueTrend = {};
    revenueData.forEach((r) => {
      revenueTrend[r.date] = (revenueTrend[r.date] || 0) + (r.earning || 0);
    });

    // Vendor comparison for recent data
    const vendorComparison = {};
    recentData.forEach((r) => {
      vendorComparison[r.client] = (vendorComparison[r.client] || 0) + (r.earning || 0);
    });

    // Daily activity (day-wise clicks) for recent data
    const dailyActivity = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    recentData.forEach((r) => {
      const dbDate = parseDbDate(r.date);
      if (dbDate) {
        const dayName = dbDate.toLocaleString("en-US", { weekday: "short" });
        dailyActivity[dayName] += r.clicks || 0;
      }
    });

    return new Response(
      JSON.stringify({
        totalClicks,
        totalImpressions,
        totalOrders,
        totalEarnings,
        activeVendors: new Set(recentData.map((r) => r.client)).size,
        revenueTrend,
        vendorComparison,
        dailyActivity,
        rows: recentData,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Stats fetch failed" }), { status: 500 });
  }
};
