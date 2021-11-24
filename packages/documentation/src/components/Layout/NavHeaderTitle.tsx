// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import React, { ReactElement } from "react";
import { AppBarTitle } from "@react-md/app-bar";
import { useLayoutConfig, isToggleableLayout } from "@react-md/layout";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { BELOW_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import styles from "./NavHeaderTitle.module.scss";
import VersionMenuItem from "./VersionMenuItem";

export default function NavHeaderTitle(): ReactElement {
  const { layout } = useLayoutConfig();
  return (
    <>
      <AppBarTitle keyline={!isToggleableLayout(layout)}>react-md</AppBarTitle>
      <DropdownMenu
        id="version-picker"
        items={[
          <VersionMenuItem small version="v3" />,
          <VersionMenuItem small version="v2" />,
          <VersionMenuItem small version="v1" />,
        ]}
        dropdownIcon={<ArrowDropDownSVGIcon />}
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        className={styles.menu}
      >
        @v3
      </DropdownMenu>
    </>
  );
}
