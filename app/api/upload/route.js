import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { raw: false }); // raw:false ensures strings

    const inserted = [];

    for (const row of rows) {
      let date = row["Date"];

      // 1️⃣ Excel serial date handling
      if (typeof date === "number") {
        const parsed = XLSX.SSF.parse_date_code(date);
        date = `${parsed.y}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
      }

      // 2️⃣ String date handling
      if (typeof date === "string") {
        date = date.trim();

        // Remove leading zeros in year like "0025-08-29"
        const parts = date.split("-");
        if (parts[0].length === 4 && parts[0].startsWith("00")) {
          parts[0] = parts[0].slice(2); // "0025" -> "25"
          date = `20${parts[0]}-${parts[1]}-${parts[2]}`; // Add 20 prefix
        }
      }

      // Insert into DB
      const newData = await prisma.fiverrData.create({
        data: {
          date: date || "", // final yyyy-mm-dd
          gigTitle: row["Gig Title"] || "Untitled",
          client: row["Client"] || "Unknown",
          clicks: Number(row["Clicks"]) || 0,
          impressions: Number(row["Impressions"]) || 0,
          orders: Number(row["Orders"]) || 0,
          completed: Number(row["Completed"]) || 0,
          pending: Number(row["Pending"]) || 0,
          earning: Number(row["Earnings"]) || 0,
        },
      });

      inserted.push(newData);
    }

    return new Response(
      JSON.stringify({ message: "Upload successful:Rows", rows: inserted.length }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to upload" }), { status: 500 });
  }
}
