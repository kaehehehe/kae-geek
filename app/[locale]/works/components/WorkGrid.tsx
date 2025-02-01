import { Container, Flex, Grid, GridItem, Link, Text } from "@yamada-ui/react";
import styles from "../styles.module.css";
import { fetchHeaders } from "../../../helpers/fetchHeaders";

type Work = {
  title: string;
  link: {
    demo: string;
    code: string;
  };
};

export async function WorkGrid() {
  const { host, protocol } = await fetchHeaders();

  const response = await fetch(`${protocol}://${host}/api/works`);
  const workList: Work[] = await response.json();

  return (
    <Container className={styles.container}>
      <Flex alignItems={"center"}>
        <Grid className={styles.grid}>
          {workList.map(({ title, link }) => (
            <GridItem key={title} className={styles["grid-item"]}>
              <iframe src={link.demo} className={styles.thumbnail} />
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                className={styles["thumbnail-card"]}
              >
                <Text className={styles.title}>{title}</Text>
                <Flex>
                  <Link href={link.demo} external className={styles.demo}>
                    Demo
                  </Link>
                  <Link href={link.code} external>
                    Code
                  </Link>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}
