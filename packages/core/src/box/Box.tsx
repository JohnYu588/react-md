import { type HTMLAttributes, forwardRef } from "react";

import { type BoxOptions, boxStyles } from "./styles.js";

/**
 * @since 6.0.0
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement>, BoxOptions {}

/**
 * The `Box` component is a wrapper around the CSS box model and should solve
 * most of your `flex` and `grid` layout requirements for responsive design.
 * There are pass-through props for all of the box module styling properties
 * available by default.
 *
 * @example Default Styles
 * ```scss
 * .box {
 *   align-items: center;
 *   display: flex;
 *   flex-wrap: wrap;
 *   gap: 1rem;
 *   padding: 1rem;
 * }
 * ```
 *
 * ```tsx
 * import { Box } from "@react-md/core/box/Box";
 * import type { ReactElement } from "react";
 *
 * export default function Example(): ReactElement {
 *   return (
 *     <Box>
 *       <div>Thing 1</div>
 *       <div>Thing 2</div>
 *       <div>Thing 3</div>
 *       <div>Thing 4</div>
 *       <div>Thing 5</div>
 *     </Box>
 *   ):
 * }
 * ```
 *
 * @example Default Grid Styles
 * ```scss
 * .box {
 *   align-items: center;
 *   display: grid;
 *   grid-gap: 1rem;
 *   grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
 *   padding: 1rem;
 * }
 * ```
 *
 * ```tsx
 * import { Box } from "@react-md/core/box/Box";
 * import type { ReactElement } from "react";
 *
 * export default function Example(): ReactElement {
 *   return (
 *     <Box grid>
 *       <div>Thing 1</div>
 *       <div>Thing 2</div>
 *       <div>Thing 3</div>
 *       <div>Thing 4</div>
 *       <div>Thing 5</div>
 *     </Box>
 *   ):
 * }
 * ```
 *
 * @example Custom Grid
 * ```scss
 * @use "@react-md/core" with (
 *   $box-grids: (
 *     small: (
 *       min: 5rem,
 *     ),
 *     medium: (
 *       min: 7rem,
 *       padding: 2rem,
 *       gap: 0.5rem,
 *     ),
 *   )
 * );
 *
 * ```
 *
 * ```tsx
 * import { Box } from "@react-md/core/box/Box";
 * import type { ReactElement } from "react";
 *
 * export default function Example(): ReactElement {
 *   return (
 *     <Box grid gridName="medium">
 *       <div>Thing 1</div>
 *       <div>Thing 2</div>
 *       <div>Thing 3</div>
 *       <div>Thing 4</div>
 *       <div>Thing 5</div>
 *     </Box>
 *   ):
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/box | Box Demos}
 * @since 6.0.0
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  function Box(props, ref) {
    const {
      style,
      className,
      children,
      align,
      justify,
      stacked,
      reversed,
      grid,
      gridName,
      gridItemSize,
      gridColumns,
      gridAutoRows,
      fullWidth,
      disableGap,
      disableWrap,
      disablePadding,
      ...remaining
    } = props;

    return (
      <div
        {...remaining}
        ref={ref}
        {...boxStyles({
          style,
          className,
          align,
          justify,
          stacked,
          reversed,
          grid,
          gridName,
          gridItemSize,
          gridColumns,
          gridAutoRows,
          fullWidth,
          disableGap,
          disableWrap,
          disablePadding,
        })}
      >
        {children}
      </div>
    );
  }
);
