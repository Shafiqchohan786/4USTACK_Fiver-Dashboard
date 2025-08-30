import { prisma } from "@/lib/prisma";
import { Parser } from "json2csv";

export async function GET() {
  try {
    // Fetch all FiverrData records from DB
    const data = await prisma.fiverrData.findMany({
      orderBy: { date: "desc" },
    });

    if (!data || data.length === 0) {
      return new Response("No data found", { status: 404 });
    }

    // Define fields (CSV headers)
    const fields = [
      "id",
      "date",
      "gigTitle",
      "client",
      "clicks",
      "impressions",
      "orders",
      "completed",
      "pending",
      "earning",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="fiverr_data.csv"',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate CSV", { status: 500 });
  }
}
