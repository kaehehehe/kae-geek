import { NotionRenderer } from "@notion-render/client";
import { Client } from "@notionhq/client";

const client = new Client({ auth: process.env.NOTION_TOKEN });
const renderer = new NotionRenderer({ client });

export const notion = {
  client,
  renderer,
};
