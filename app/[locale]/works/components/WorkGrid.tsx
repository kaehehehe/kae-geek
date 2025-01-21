import { Container, Flex, Grid, GridItem, Link, Text } from "@yamada-ui/react";
import Image from "next/image";
import styles from "../styles.module.css";
import { headers } from "next/headers";

type Work = {
  title: string;
  thumbnail: string;
  link: string;
};

export async function WorkGrid() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const response = await fetch(`${protocol}://${host}/api/works`);
  const workList: Work[] = await response.json();

  return (
    <Container className={styles.container}>
      <Grid className={styles.grid}>
        {workList.map(({ title, thumbnail, link }) => (
          <Link key={title} href={link} external>
            <GridItem className={styles["grid-item"]}>
              <Image
                src={thumbnail}
                alt={title}
                priority
                fill={true}
                className={styles.thumbnail}
              />

              <Flex
                justify={"center"}
                align={"center"}
                className={styles["thumbnail-card"]}
              >
                <Text className={styles.title}>{title}</Text>
              </Flex>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}
