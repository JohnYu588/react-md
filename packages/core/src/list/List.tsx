import { type HTMLAttributes, forwardRef } from "react";

import { type ListClassNameOptions, list } from "./listStyles.js";

export type ListElement = HTMLUListElement | HTMLOListElement;

/**
 * @since 6.3.1 Extends the ListClassNameOptions
 */
export interface ListProps
  extends HTMLAttributes<ListElement>,
    ListClassNameOptions {
  /**
   * @defaultValue `"none"`
   */
  role?: HTMLAttributes<ListElement>["role"];

  /**
   * Set this to `true` to render as `<ol>` instead of `<ul>` when the children
   * are in a specific order. For example: steps within a recipe.
   *
   * @defaultValue `false`
   */
  ordered?: boolean;
}

/**
 * The `List` component is used to render a collection of clickable actions
 * vertically or horizontally and does not include the default `ol`/`ul` styles.
 *
 * @example Simple Example
 * ```tsx
 * import { List } from "@react-md/core/list/List";
 * import { ListItem } from "@react-md/core/list/ListItem";
 * import { ListItemLink } from "@react-md/core/list/ListItemLink";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <List>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 1
 *       </ListItem>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 2
 *       </ListItem>
 *       <ListItem
 *         onClick={() => {
 *           // do something
 *         }}
 *       >
 *         Item 3
 *       </ListItem>
 *       <ListItemLink href="/some-route">Link Example</ListItemLink>
 *     </List>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/list | List Demos}
 */
export const List = forwardRef<ListElement, ListProps>(
  function List(props, ref) {
    const {
      className,
      children,
      role = "none",
      dense = false,
      ordered = false,
      horizontal = false,
      ...remaining
    } = props;
    const Component = (ordered ? "ol" : "ul") as "ul";
    return (
      <Component
        {...remaining}
        ref={ref}
        role={role}
        className={list({
          dense,
          horizontal,
          className,
        })}
      >
        {children}
      </Component>
    );
  }
);
