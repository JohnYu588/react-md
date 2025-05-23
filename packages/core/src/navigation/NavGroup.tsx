import { type ReactNode, forwardRef } from "react";

import { List, type ListProps } from "../list/List.js";
import { navGroup } from "./navGroupStyles.js";

/**
 * @since 6.0.0
 */
export interface NavGroupProps extends ListProps {
  depth: number;
  children: ReactNode;
}

/**
 * A simple wrapper around the {@link Link} component that ads the
 * `--rmd-tree-depth: depth` custom property to allow for incremented padding.
 *
 * @see {@link https://react-md.dev/components/navigation | Navigation Demos}
 * @since 6.0.0
 */
export const NavGroup = forwardRef<HTMLUListElement, NavGroupProps>(
  function NavGroup(props, ref) {
    const { style, depth, className, children, ...remaining } = props;

    return (
      <List
        {...remaining}
        ref={ref}
        style={{ ...style, "--rmd-tree-depth": depth }}
        className={navGroup({
          className,
          disablePadding: depth > 0,
        })}
      >
        {children}
      </List>
    );
  }
);
