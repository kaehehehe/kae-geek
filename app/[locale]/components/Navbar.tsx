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
        justifyContent="space-between"
        alignItems="center"
        width="90vw"
        maxWidth={1200}
        margin="20px auto 0"
      >
        <Flex justifyContent="space-around" width={180}>
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

        <Flex justifyContent="space-between" width={90}>
          <GithubIconButton />
          <LocaleMenuButton />
        </Flex>
      </Flex>
    </nav>
  );
}
