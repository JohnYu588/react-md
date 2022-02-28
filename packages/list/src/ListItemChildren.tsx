import type { ReactElement } from "react";

import { ListItemAddon } from "./ListItemAddon";
import { ListItemText } from "./ListItemText";
import type { ListItemChildrenProps } from "./types";

/**
 * The `ListItemChildren` component is used to create a styled list item that
 * can have optional addons to the left or right of the children in the form of
 * icons, avatars, or media. The `children` can be replaced by the `primaryText`
 * and `secondaryText` props to create stacked text spanning two or more lines
 * with the default behavior of using `line-clamp` at three lines.
 *
 * Note: This will return a `React.Fragment` of the children and does not wrap
 * in a DOM node for styling. The parent component should normally have
 * `display: flex` for the styling to work.
 */
export function ListItemChildren({
  textClassName,
  secondaryTextClassName,
  textChildren,
  primaryText,
  secondaryText,
  leftAddon,
  leftAddonType = "icon",
  leftAddonPosition = "middle",
  rightAddon,
  rightAddonType = "icon",
  rightAddonPosition = "middle",
  forceAddonWrap,
  children: propChildren,
}: ListItemChildrenProps): ReactElement {
  const stringifiedChildren =
    typeof propChildren === "number" ? `${propChildren}` : propChildren;

  let children = stringifiedChildren;
  if (primaryText || secondaryText || textChildren) {
    children = (
      <ListItemText
        className={textClassName}
        secondaryText={secondaryText}
        secondaryTextClassName={secondaryTextClassName}
      >
        {(textChildren && children) || primaryText}
      </ListItemText>
    );
  }

  children = (
    <ListItemAddon
      addon={leftAddon}
      type={leftAddonType}
      position={leftAddonPosition}
      forceAddonWrap={forceAddonWrap}
    >
      {children}
    </ListItemAddon>
  );
  children = (
    <ListItemAddon
      addon={rightAddon}
      addonAfter
      type={rightAddonType}
      position={rightAddonPosition}
      forceAddonWrap={forceAddonWrap}
    >
      {children}
    </ListItemAddon>
  );

  return (
    <>
      {children}
      {(primaryText && stringifiedChildren) || null}
    </>
  );
}
