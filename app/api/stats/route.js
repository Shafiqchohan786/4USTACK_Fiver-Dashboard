import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Last 7 days ke dates ko DB format me convert karo (m/d/yy)
    const getDbDateFormat = (d) => {
      const month = d.getMonth() + 1; // 0-based
      const day = d.getDate();
      const year = String(d.getFullYear()).slice(-2); // last 2 digits
      return `${month}/${day}/${year}`;
    };

    const todayStr = getDbDateFormat(today);
    const sevenDaysAgoStr = getDbDateFormat(sevenDaysAgo);

    // Fetch all rows first
    const allData = await prisma.fiverrData.findMany({
      orderBy: { date: "asc" },
    });

    // Filter manually last 7 days ke data ke liye
    const data = allData.filter(r => {
      // Convert DB string date to comparable format
      const parts = r.date.split("/");
      if (parts.length === 3) {
        const dbMonth = parseInt(parts[0]);
        const dbDay = parseInt(parts[1]);
        const dbYear = parseInt(parts[2]);
        const dbDateComparable = new Date(2000 + dbYear, dbMonth - 1, dbDay);
        return dbDateComparable >= sevenDaysAgo && dbDateComparable <= today;
      }
      return false;
    });

    // Stats calculation
    const totalClicks = data.reduce((a, b) => a + b.clicks, 0);
    const totalImpressions = data.reduce((a, b) => a + b.impressions, 0);
    const totalOrders = data.reduce((a, b) => a + b.orders, 0);
    const totalEarnings = data.reduce((a, b) => a + b.earning, 0);
    const activeVendors = [...new Set(data.map(r => r.client))].length;

    // Revenue trend
    const revenueTrend = {};
    data.forEach(r => {
      revenueTrend[r.date] = (revenueTrend[r.date] || 0) + r.earning;
    });

    // Vendor comparison
    const vendorComparison = {};
    data.forEach(r => {
      vendorComparison[r.client] = (vendorComparison[r.client] || 0) + r.earning;
    });

    // Daily activity
    const dailyActivity = { Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0 };
    data.forEach(r => {
      const parts = r.date.split("/");
      const dbMonth = parseInt(parts[0]) - 1;
      const dbDay = parseInt(parts[1]);
      const dbYear = 2000 + parseInt(parts[2]);
      const dayName = new Date(dbYear, dbMonth, dbDay).toLocaleString("en-US", { weekday: "short" });
      dailyActivity[dayName] += r.clicks;
    });

    return new Response(JSON.stringify({
      totalClicks,
      totalImpressions,
      totalOrders,
      totalEarnings,
      activeVendors,
      revenueTrend,
      vendorComparison,
      dailyActivity,
      rows: data
    }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Stats fetch failed" }), { status: 500 });
  }
};
