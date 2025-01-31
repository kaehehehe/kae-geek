import React from "react";
import { fetchHeaders } from "../../../helpers/fetchHeaders";
import { Heading, Link, Text } from "@yamada-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { host, protocol } = await fetchHeaders();

  const { slug } = await params;

  const response = await fetch(
    `${protocol}://${host}/api/posts/slug?slug=${slug}`
  );

  const post = await response.json();

  if (!post) {
    return <div>Post not found</div>;
  }

  const res = await fetch(
    `${protocol}://${host}/api/posts/pageId?pageId=${post.id}`
  );

  const blocks = await res.json();

  const renderBlock = (block: any, index: number) => {
    const type = block.type;
    const value = block[type];

    if (!value) {
      return null;
    }

    const hasRichText = "rich_text" in value;
    const hasImage = "file" in value;
    const hasLink = "url" in value;
    const richText = hasRichText ? value.rich_text[0]?.plain_text : null;
    const imageUrl = hasImage ? value.file.url : null;
    const linkUrl = hasLink ? value.url : null;

    switch (type) {
      case "heading_1":
        return (
          <Heading key={index} as="h1" fontSize="6xl">
            {richText}
          </Heading>
        );

      case "heading_2":
        return (
          <Heading key={index} as="h2" fontSize="5xl">
            {richText}
          </Heading>
        );

      case "heading_3":
        return (
          <Heading key={index} as="h3" fontSize="4xl">
            {richText}
          </Heading>
        );

      case "paragraph":
        return (
          <Text key={index} fontSize={"s"}>
            {richText}
          </Text>
        );

      case "image":
        return (
          <Image
            key={index}
            src={imageUrl}
            alt="image"
            width={600}
            height={400}
          />
        );

      case "bookmark":
        return (
          <Link key={index} href={linkUrl} external>
            {linkUrl}
          </Link>
        );

      case "code":
        return (
          <SyntaxHighlighter
            key={index}
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers
          >
            {richText}
          </SyntaxHighlighter>
        );

      default:
        return <div key={index}>{richText}</div>;
    }
  };

  return <>{blocks.map(renderBlock)}</>;
}
