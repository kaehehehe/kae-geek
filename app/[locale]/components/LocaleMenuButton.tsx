"use client";

import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@yamada-ui/react";
import { LanguagesIcon } from "@yamada-ui/lucide";
import { useLocale } from "next-intl";
import { Locale } from "../../../i18n/routing";
import { CheckIcon } from "@yamada-ui/lucide";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LocaleMenuButton() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const setOpacity = (locale: Locale) => {
    return locale === currentLocale ? 1 : 0;
  };

  const changeLocalePath = (locale: Locale) => {
    return pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
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
        <Link href={changeLocalePath("ja")} passHref>
          <MenuItem>
            <CheckIcon opacity={setOpacity("ja")} />
            日本語
          </MenuItem>
        </Link>

        <Link href={changeLocalePath("ko")} passHref>
          <MenuItem>
            <CheckIcon opacity={setOpacity("ko")} />
            한국어
          </MenuItem>
        </Link>

        <Link href={changeLocalePath("en")} passHref>
          <MenuItem>
            <CheckIcon opacity={setOpacity("en")} />
            English
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
