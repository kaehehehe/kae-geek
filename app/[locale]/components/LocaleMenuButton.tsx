import Link from "next/link";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
} from "@yamada-ui/react";
import { LanguagesIcon } from "@yamada-ui/lucide";
import { useLocale } from "next-intl";
import { Locale } from "../../../i18n/routing";
import { CheckIcon } from "@yamada-ui/lucide";

export default function LocaleMenuButton() {
  const currentLocale = useLocale();

  const setOpacity = (locale: Locale) => {
    return locale === currentLocale ? 1 : 0;
  };

  return (
    <Menu animation="top">
      <MenuButton
        as={IconButton}
        icon={<LanguagesIcon />}
        colorScheme="primary"
        variant="primary"
        fontSize={"2xl"}
      />
      <MenuList minBoxSize={"100px"}>
        <Link href="ja">
          <MenuItem>
            <CheckIcon opacity={setOpacity("ja")} />
            日本語
          </MenuItem>
        </Link>

        <Link href="ko">
          <MenuItem>
            <CheckIcon opacity={setOpacity("ko")} />
            한국어
          </MenuItem>
        </Link>

        <Link href="en">
          <Flex alignItems={"center"}>
            <MenuItem>
              <CheckIcon opacity={setOpacity("en")} />
              English
            </MenuItem>
          </Flex>
        </Link>
      </MenuList>
    </Menu>
  );
}
