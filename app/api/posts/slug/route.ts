import { NextResponse } from "next/server";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../../../lib/notion";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  try {
    if (slug) {
      const response = await notion.client.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
      });

      return NextResponse.json(
        response.results[0] as PageObjectResponse | undefined
      );
    } else {
      return NextResponse.json(
        { error: "Invalid request. Provide a slug." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
