import { Flex, Text } from "@yamada-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Flex
      justify={"center"}
      alignItems={"center"}
      width={"100vw"}
      paddingBottom={"5px"}
    >
      <Text fontSize={"xs"}>© 2025 Kae All Rights Reserved.</Text>
    </Flex>
  );
}
