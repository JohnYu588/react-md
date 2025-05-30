import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { ListItemChildren } from "../list/ListItemChildren.js";
import { listItem } from "../list/listItemStyles.js";
import {
  type ListItemChildrenProps,
  type ListItemHeight,
} from "../list/types.js";
import {
  CircularProgress,
  type CircularProgressProps,
} from "../progress/CircularProgress.js";

/**
 * @since 6.0.0
 */
export interface MenuItemCircularProgressProps extends CircularProgressProps {
  /** @defaultValue `"Loading"` */
  "aria-label"?: string;

  /** @defaultValue `"none"` */
  role?: string;

  /** @defaultValue `true` */
  dense?: boolean;

  liProps?: HTMLAttributes<HTMLLIElement>;
  height?: ListItemHeight;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  listItemChildrenProps?: ListItemChildrenProps;
}

/**
 * @example Simple Example
 * ```tsx
 * "use client";
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItem } from "@react-md/core/menu/MenuItem";
 * import { MenuItemCircularProgress } from "@react-md/core/menu/MenuItemCircularProgress";
 * import { useAsyncFunction } from "@react-md/core/useAsyncFunction";
 *
 * function Example() {
 *   const { handleAsync, pending } = useAsyncFunction();
 *   const [visible, setVisible] = useState(false);
 *
 *   return (
 *     <DropdownMenu buttonChildren="Options" visible={visible} setVisible={setVisible}>
 *       {pending && <MenuItemCircularProgress />}
 *       <MenuItem
 *         onClick={handleAsync(async (event) => {
 *           // prevent menu from closing until action completes
 *           event.stopPropagation()
 *
 *           // do something async
 *           await ...
 *
 *           // close menu once completed
 *           setVisible(false)
 *         })}
 *       >
 *         Some Action
 *       </MenuItem>
 *     </DropdownMenu>
 *   )
 * }
 * ```
 *
 * @since 6.0.0
 */
export const MenuItemCircularProgress = forwardRef<
  HTMLLIElement,
  MenuItemCircularProgressProps
>(function MenuItemCircularProgress(props, ref) {
  const {
    "aria-label": propAriaLabel,
    "aria-labelledby": ariaLabelledBy,
    role = "none",
    className,
    height,
    leftAddon,
    rightAddon,
    liProps,
    listItemChildrenProps,
    ...remaining
  } = props;
  let ariaLabel = propAriaLabel;
  if (!ariaLabel && !ariaLabelledBy) {
    ariaLabel = "Loading";
  }

  return (
    <li
      {...liProps}
      ref={ref}
      role={role}
      className={cnb(listItem({ height, className }), liProps?.className)}
    >
      <ListItemChildren
        {...listItemChildrenProps}
        leftAddon={leftAddon}
        rightAddon={rightAddon}
      >
        <CircularProgress
          aria-label={ariaLabel as string}
          aria-labelledby={ariaLabelledBy}
          dense
          {...remaining}
        />
      </ListItemChildren>
    </li>
  );
});
