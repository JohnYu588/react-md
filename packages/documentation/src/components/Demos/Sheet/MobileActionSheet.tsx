import { ReactElement, useCallback } from "react";
import {
  ArrowDropDownSVGIcon,
  DeleteSVGIcon,
  EditSVGIcon,
  LinkSVGIcon,
  ShareSVGIcon,
} from "@react-md/material-icons";
import {
  defaultMenuRenderer,
  DropdownMenu,
  MenuRenderer,
} from "@react-md/menu";
import { Sheet, SheetProps } from "@react-md/sheet";
import { useAppSize } from "@react-md/utils";

import styles from "./MobileActionSheet.module.scss";

const items = [
  { leftAddon: <ShareSVGIcon />, children: "Share" },
  { leftAddon: <LinkSVGIcon />, children: "Get link" },
  { leftAddon: <EditSVGIcon />, children: "Edit name" },
  { leftAddon: <DeleteSVGIcon />, children: "Delete collection" },
];

function MenuSheet({ children, ...props }: SheetProps): ReactElement {
  const { onRequestClose } = props;
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target !== event.currentTarget) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  return (
    <Sheet
      {...props}
      className={styles.sheet}
      onRequestClose={onRequestClose}
      role="menu"
      disableFocusOnMount
      position="bottom"
      onClick={handleClick}
    >
      {children}
    </Sheet>
  );
}

const renderSheet: MenuRenderer = ({
  // these props are only required for the `Menu` component, but not within the sheet
  // so we can just extract them and not pass them down
  horizontal: _horizontal,
  controlId: _controlId,
  anchor: _anchor,
  positionOptions: _positionOptions,
  closeOnResize: _closeOnResize,
  closeOnScroll: _closeOnScroll,
  ...props
}) => <MenuSheet {...props} />;

export default function MobileActionSheet(): ReactElement {
  const { isTablet, isLandscape, isDesktop, isLargeDesktop } = useAppSize();
  const sheet = !isDesktop && !isLargeDesktop && !(isTablet && isLandscape);
  return (
    <DropdownMenu
      id="dropdown-menu-1"
      items={items}
      dropdownIcon={<ArrowDropDownSVGIcon />}
      menuRenderer={sheet ? renderSheet : defaultMenuRenderer}
    >
      Dropdown
    </DropdownMenu>
  );
}
