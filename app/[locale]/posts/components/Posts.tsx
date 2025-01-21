import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Text,
} from "@yamada-ui/react";
import React from "react";
import styles from "../styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "../../../../i18n/routing";

type Post = {
  title: string;
  description: string;
  path: string;
  publishAt: string;
};

export async function Posts({ locale }: { locale: Locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const posts: Post[] = await response.json();

  return (
    <Flex direction={"column"} justify={"center"} alignItems={"center"}>
      <Container className={styles.container}>
        {posts.map(({ title, description, path, publishAt }) => (
          <Link key={title} href={`/${locale}/posts/${path}`}>
            <Card className={styles.card} variant={"outline"}>
              <CardHeader>
                <Heading as={"h5"}>{title}</Heading>
              </CardHeader>

              <CardBody>
                <Image
                  src={`/images/posts/${path}.png`}
                  alt="thumbnail"
                  priority
                  height={200}
                  width={300}
                />

                <Text>{description}</Text>
                <Text>{publishAt.split("T")[0]}</Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Container>
    </Flex>
  );
}
