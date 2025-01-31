import { NextResponse } from "next/server";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "../../../lib/notion";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageId = url.searchParams.get("pageId");

  try {
    if (pageId) {
      const response = await notion.client.blocks.children.list({
        block_id: pageId,
      });

      return NextResponse.json(response.results as BlockObjectResponse[]);
    } else {
      return NextResponse.json(
        { error: "Invalid request. Provide a pageId." },
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
