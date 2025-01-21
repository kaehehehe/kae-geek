import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import matter from "@yankeeinlondon/gray-matter";

const POSTS_PATH = path.join(process.cwd(), "app", "posts");

export async function GET() {
  try {
    const files = await fs.readdir(POSTS_PATH);

    const posts = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(POSTS_PATH, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug: file.replace(".md", ""),
          ...data,
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}
