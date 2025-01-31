import { NextResponse } from "next/server";
import { notion } from "../../lib/notion";

export async function GET() {
  try {
    const response = await notion.client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      // filter: {
      //   property: "Status",
      //   select: {
      //     equals: "Live",
      //   },
      // },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
