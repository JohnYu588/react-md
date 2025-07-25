"use client";

import { forwardRef } from "react";

import { List, type ListProps } from "../list/List.js";
import {
  KeyboardMovementProvider,
  useKeyboardMovementProvider,
} from "../movement/useKeyboardMovementProvider.js";
import { MenuBarProvider, useMenuBarProvider } from "./useMenuBarProvider.js";

export interface MenuBarProps extends Omit<ListProps, "role"> {
  /**
   * @defaultValue `true`
   */
  horizontal?: boolean;

  /**
   * Set this to a number greater than 0 to allow opening dropdown menus within
   * the menubar after hovering for the duration in milliseconds. Once a menu
   * becomes visible within the menubar, all subsequent menus will become
   * visible immediately on hover as well until the hover mode is ended.
   *
   * For example:
   *
   * - `0` - the dropdown menus become visible immediately on hover
   * - `1000` - the first dropdown menu becomes visible after hovering for 1
   *   second
   * - `undefined` - the hover mode can only be activate after a click with
   *   mouse, touch, or keyboard
   *
   * @defaultValue `undefined`
   */
  hoverTimeout?: number;
}

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuBar } from "@react-md/core/menu/MenuBar";
 * import { MenuItem } from "@react-md/core/menu/MenuItem";
 * import type { ReactElement } from "react";
 *
 * export function SimpleExample(): ReactElement {
 *   return (
 *     <MenuBar>
 *       <DropdownMenu buttonChildren="Item 1">
 *         <MenuItem>Menu Item 1</MenuItem>
 *         <MenuItem>Menu Item 2</MenuItem>
 *         <MenuItem>Menu Item 3</MenuItem>
 *       </DropdownMenu>
 *       <DropdownMenu buttonChildren="Item 2">
 *         <MenuItem>Menu Item 1</MenuItem>
 *         <MenuItem>Menu Item 2</MenuItem>
 *         <MenuItem>Menu Item 3</MenuItem>
 *       </DropdownMenu>
 *       <DropdownMenu buttonChildren="Item 3">
 *         <MenuItem>Menu Item 1</MenuItem>
 *         <MenuItem>Menu Item 2</MenuItem>
 *         <MenuItem>Menu Item 4</MenuItem>
 *       </DropdownMenu>
 *     </MenuBar>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/menu | Menu Demos}
 * @since 5.0.0
 * @since 6.0.0 Combined with the previous `MenuBarWidget`
 */
export const MenuBar = forwardRef<HTMLUListElement, MenuBarProps>(
  function MenuBar(props, ref) {
    const {
      onClick,
      onFocus,
      onKeyDown,
      horizontal = true,
      hoverTimeout,
      children,
      ...remaining
    } = props;
    const menuBarContext = useMenuBarProvider({
      root: true,
      menubar: true,
      hoverTimeout,
    });
    const { activeId, enableHoverMode } = menuBarContext;
    const { movementProps, movementContext } = useKeyboardMovementProvider({
      ref,
      onClick,
      onFocus,
      onKeyDown,
      loopable: true,
      searchable: true,
      horizontal,
      includeDisabled: true,
      tabIndexBehavior: "roving",
      onFocusChange(event) {
        if (activeId) {
          enableHoverMode(event.element.id);
        }
      },
    });

    return (
      <KeyboardMovementProvider value={movementContext}>
        <MenuBarProvider value={menuBarContext}>
          <List
            {...remaining}
            {...movementProps}
            role="menubar"
            horizontal={horizontal}
          >
            {children}
          </List>
        </MenuBarProvider>
      </KeyboardMovementProvider>
    );
  }
);
