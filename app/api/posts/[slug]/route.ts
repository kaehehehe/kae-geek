import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import matter from "@yankeeinlondon/gray-matter";

const POSTS_PATH = path.join(process.cwd(), "app", "posts");

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const filePath = path.join(POSTS_PATH, `${slug}.md`); // 슬러그를 사용하여 파일 경로 생성
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent); // gray-matter를 사용하여 메타데이터와 내용 분리

    return NextResponse.json({ data, content });
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
