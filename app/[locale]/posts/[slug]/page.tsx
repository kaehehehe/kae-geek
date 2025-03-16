import React, { Key } from "react";
import { fetchHeaders } from "../../../helpers/fetchHeaders";
import { Container, Heading, Link, Text } from "@yamada-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Image from "next/image";
import styles from "./styles.module.css";

type AnnotationsType = {
  bold: boolean;
  color: string;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
};

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

  const {
    properties: { title, created },
  } = post;

  if (!post) {
    return <div>Post not found</div>;
  }

  const res = await fetch(
    `${protocol}://${host}/api/posts/pageId?pageId=${post.id}`
  );

  const blocks = await res.json();

  const renderBlock = (block: any, index: Key) => {
    const type = block.type;
    const value = block[type];

    const hasRichText = "rich_text" in value;
    const hasImage = "file" in value;
    const hasLink = "url" in value;
    const richText = hasRichText ? value.rich_text[0]?.plain_text : null;
    const imageUrl = hasImage ? value.file.url : null;
    const linkUrl = hasLink ? value.url : null;

    if (!richText && !hasImage && !hasLink) {
      return <br />;
    }

    switch (type) {
      case "heading_1":
        return (
          <Heading
            key={index}
            as="h1"
            fontSize="5xl"
            className={styles.heading_1}
          >
            {richText}
          </Heading>
        );

      case "heading_2":
        return (
          <Heading
            key={index}
            as="h2"
            fontSize="4xl"
            className={styles.heading_2}
          >
            {richText}
          </Heading>
        );

      case "heading_3":
        return (
          <Heading
            key={index}
            as="h3"
            fontSize="3xl"
            className={styles.heading_2}
          >
            {richText}
          </Heading>
        );

      case "bulleted_list_item":
        return (
          <summary key={index} className={styles.bulleted_list_item}>
            {richText}
          </summary>
        );

      case "paragraph":
        return (
          <Text key={index} fontSize="lg" className={styles.paragraph}>
            {value.rich_text.map(
              (
                {
                  href,
                  plain_text,
                  annotations,
                }: {
                  href: string;
                  plain_text: string;
                  annotations: AnnotationsType;
                },
                idx: Key
              ) => {
                const { code, bold } = annotations;

                if (href) {
                  return (
                    <Link key={idx} href={href} external>
                      {plain_text}
                    </Link>
                  );
                }

                return (
                  <span
                    key={idx}
                    className={`${code ? styles.code : null} ${
                      bold ? styles.bold : null
                    }`}
                  >
                    {plain_text}
                  </span>
                );
              }
            )}
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
            className={styles.image}
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
          <div key={index} className={styles.code}>
            <SyntaxHighlighter
              language={value.language}
              style={atomOneDark}
              customStyle={{
                padding: "25px",
                borderRadius: "10px",
              }}
              wrapLongLines
              showLineNumbers
            >
              {richText}
            </SyntaxHighlighter>
          </div>
        );

      default:
        return <div key={index}>{richText}</div>;
    }
  };

  return (
    <Container className={styles.container}>
      <Heading as="h1" fontSize="6xl" margin={0} padding={0}>
        {title.title[0].plain_text}
      </Heading>

      <Text margin={0} padding={0}>
        {created.date.start}
      </Text>
      <span>{blocks.map(renderBlock)}</span>
    </Container>
  );
}
