import { Flex, Text } from "@yamada-ui/react";
import React from "react";
import LocaleMenuButton from "./LocaleMenuButton";
import Link from "next/link";
import GIthubIconButton from "./GIthubIconButton";
import { Locale } from "../../../i18n/routing";

export default function Navbar({ locale }: { locale: Locale }) {
  return (
    <nav>
      <Flex
        justify={"space-between"}
        alignItems={"center"}
        padding={"20px 40px"}
      >
        <Flex justify={"space-around"} width={"180px"}>
          <Link href={`/${locale}/`} passHref>
            <Text>Home</Text>
          </Link>
          <Link href={`/${locale}/works`} passHref>
            <Text>Works</Text>
          </Link>
          {/* <Link href={`/${locale}/posts`}>
            <Text>Posts</Text>
          </Link> */}
        </Flex>

        <Flex justify={"space-around"} width={"100px"}>
          <GIthubIconButton />
          <LocaleMenuButton />
        </Flex>
      </Flex>
    </nav>
  );
}
