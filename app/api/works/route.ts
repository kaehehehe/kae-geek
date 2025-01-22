import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "works.json");

  try {
    const jsonData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading or parsing JSON:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
