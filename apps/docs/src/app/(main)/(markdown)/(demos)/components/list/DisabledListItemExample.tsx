import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function DisabledListItemExample(): ReactElement {
  return (
    <List>
      <ListItem disabled>Disabled Item</ListItem>
      <ListItem disabled disabledOpacity>
        Disabled Item (Opacity)
      </ListItem>
      <ListItem disabled leftAddon={<FavoriteIcon />}>
        Disabled Item
      </ListItem>
      <ListItem disabled disabledOpacity leftAddon={<FavoriteIcon />}>
        Disabled Item (Opacity)
      </ListItem>
    </List>
  );
}
