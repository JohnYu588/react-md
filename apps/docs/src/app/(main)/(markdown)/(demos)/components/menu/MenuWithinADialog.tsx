"use client";

import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function MenuWithinADialog(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  return (
    <>
      <Button onClick={enable}>Show Dialog</Button>
      <Dialog aria-label="Example" visible={toggled} onRequestClose={disable}>
        <DialogContent>
          <Typography>
            {
              "Here is a paragraph of text. Even though it's really only two sentences."
            }
          </Typography>
          <DropdownMenu buttonChildren="Dropdown">
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </>
  );
}
