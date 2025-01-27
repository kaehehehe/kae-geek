import Link from "next/link";
import { fetchHeaders } from "../../helpers/fetchHeaders";
import { Flex, Heading, Text } from "@yamada-ui/react";

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
    <div>
      {posts.results.map((post: any) => {
        return (
          <Link
            key={post.id}
            href={`/${locale}/posts/${post.properties.slug.rich_text[0]?.plain_text}`}
          >
            <article>
              <Flex alignItems={"center"}>
                <span>{post?.icon?.emoji}</span>
                <Heading as={"h2"}>
                  {post.properties.Title.title[0].plain_text}
                </Heading>
              </Flex>

              <Text></Text>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
