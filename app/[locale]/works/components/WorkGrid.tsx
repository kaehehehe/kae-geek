import { Container, Flex, Grid, GridItem, Link, Text } from "@yamada-ui/react";
import styles from "../styles.module.css";
import { fetchHeaders } from "../../../helpers/fetchHeaders";

type Work = {
  title: string;
  link: string;
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
            <Link key={title} href={link} external>
              <GridItem className={styles["grid-item"]}>
                <iframe src={link} className={styles.thumbnail} />
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
      </Flex>
    </Container>
  );
}
