import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import MoreVertOutlinedIcon from "@react-md/material-icons/MoreVertOutlinedIcon";
import { type ReactElement } from "react";

export default function IconButtonExample(): ReactElement {
  return (
    <DropdownMenu
      aria-label="Options"
      buttonType="icon"
      buttonChildren={<MoreVertOutlinedIcon />}
    >
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
