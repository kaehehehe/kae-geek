import fs from "fs/promises";
import path from "path";
import matter from "@yankeeinlondon/gray-matter";
import { serialize } from "next-mdx-remote/serialize"; // MDX 콘텐츠 직렬화
import { compileMDX, MDXRemote } from "next-mdx-remote/rsc"; // MDX 콘텐츠 렌더링
import remarkBreaks from "remark-breaks";
import remarkHtml from "remark-html";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { notFound } from "next/navigation";
import remarkMdx from "remark-mdx";

const POSTS_PATH = path.join(process.cwd(), "app", "posts");

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const filePath = path.join(POSTS_PATH, `${slug}.md`);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return (
      <div>
        <h1>{data.title}</h1>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [
                remarkMdx,
                remarkHtml,
                remarkBreaks,
                remarkSmartypants,
              ],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, { theme: "dracula" }],
              ],
            },
          }}
        />
      </div>
    );
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    notFound(); // 포스트를 찾을 수 없는 경우 404 페이지로 이동
  }
}
