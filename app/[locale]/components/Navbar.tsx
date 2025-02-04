import { Flex, Text } from "@yamada-ui/react";
import React from "react";
import Link from "next/link";
import { Locale } from "../../../i18n/routing";
import { LocaleMenuButton } from "./LocaleMenuButton";
import { GithubIconButton } from "./GIthubIconButton";

export function Navbar({ locale }: { locale: Locale }) {
  return (
    <nav>
      <Flex
        justify={"space-between"}
        alignItems={"center"}
        padding={"20px 20px"}
      >
        <Flex justify={"space-around"} width={"170px"}>
          <Link href={`/${locale}/`} passHref>
            <Text>Home</Text>
          </Link>
          <Link href={`/${locale}/works`} passHref>
            <Text>Works</Text>
          </Link>
          <Link href={`/${locale}/posts`}>
            <Text>Posts</Text>
          </Link>
        </Flex>

        <Flex justify={"space-around"} width={"90px"}>
          <GithubIconButton />
          <LocaleMenuButton />
        </Flex>
      </Flex>
    </nav>
  );
}
