import React from "react";
import { GithubIcon } from "@yamada-ui/lucide";
import { IconButton, Link } from "@yamada-ui/react";

export default function GithubIconButton() {
  return (
    <Link href={"https://github.com/kaehehehe"} external>
      <IconButton
        icon={<GithubIcon />}
        colorScheme="primary"
        variant="primary"
        fontSize={"2xl"}
        color={"black"}
      />
    </Link>
  );
}
