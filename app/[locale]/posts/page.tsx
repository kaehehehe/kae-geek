import Link from "next/link";
import { fetchHeaders } from "../../helpers/fetchHeaders";
import { Container, Flex, Heading, Text } from "@yamada-ui/react";
import styles from "./styles.module.css";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { host, protocol } = await fetchHeaders();

  const response = await fetch(`${protocol}://${host}/api/posts`);
  const posts = await response.json();

  const locale = (await params).locale;

  return (
    <Container className={styles.container}>
      {posts.results.map((post: any) => {
        const { title, description, created, slug } = post.properties;

        return (
          <Link
            key={post.id}
            href={`/${locale}/posts/${slug.rich_text[0]?.plain_text}`}
          >
            <article className={styles.post}>
              <Flex direction={"column"}>
                <Flex alignItems={"center"} className={styles.title}>
                  <Text fontSize={"2xl"} className={styles.emoji}>
                    {post?.icon?.emoji}
                  </Text>
                  <Heading as={"h4"} fontSize={"2xl"}>
                    {title.title[0].plain_text}
                  </Heading>
                </Flex>

                <Text fontSize={"lg"} className={styles.description}>
                  {description.rich_text[0].plain_text}
                </Text>
                <Text>{created.date.start}</Text>
              </Flex>
            </article>
          </Link>
        );
      })}
    </Container>
  );
}
