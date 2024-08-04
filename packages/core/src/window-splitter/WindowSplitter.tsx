import { forwardRef, type ButtonHTMLAttributes } from "react";
import { type LabelRequiredForA11y } from "../types.js";
import { windowSplitter } from "./styles.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useWindowSplitter } from "./useWindowSplitter.js";

/**
 * @since 6.0.0
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/}
 */
export interface BaseWindowSplitterProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  "aria-controls": string;

  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  dragging: boolean;

  /**
   * This will be provided by the {@link useWindowSplitter} hook.
   */
  reversed: boolean;

  /**
   * Set this to `true` if the window splitter should use `position: absolute`
   * instead of `position: fixed`.
   *
   * @defaultValue `false`
   */
  disableFixed?: boolean;
}

/**
 * @since 6.0.0
 */
export type WindowSplitterProps = LabelRequiredForA11y<BaseWindowSplitterProps>;

/**
 * The `WindowSplitter` should be used with the `useWindowSplitter` hook to
 * resize parts of a layout.
 *
 * See the `useResizableLayout` hook if the entire page layout should be
 * resizable.
 *
 * @example Simple Example
 * ```tsx
 * "use client";
 * import { WindowSplitter } from "@react-md/core/window-splitter/WindowSplitter";
 * import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
 * import { useId, type ReactElement } from "react";
 *
 * export function Example(): ReactElement {
 *   const panelId = useId();
 *   const { value, splitterProps } = useWindowSplitter({
 *     min: 120,
 *     max: 380,
 *   });
 *
 *   return (
 *     <div
 *       style={{
 *         "--rmd-window-splitter-position": `${value}px`,
 *         display: "grid",
 *         gridTemplateColumns: "var(--rmd-window-splitter-position, 120px) 1fr",
 *       }}
 *     >
 *       <div>Panel 1</div>
 *       <WindowSplitter
 *         {...splitterProps}
 *         aria-controls={panelId}
 *         aria-labelledby={panelId}
 *       />
 *       <div>Panel 2</div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const WindowSplitter = forwardRef<
  HTMLButtonElement,
  WindowSplitterProps
>(function WindowSplitter(props, ref) {
  const {
    role = "separator",
    className,
    dragging,
    reversed,
    disableFixed = false,
    ...remaining
  } = props;
  const vertical = props["aria-orientation"] === "vertical";

  return (
    <button
      {...remaining}
      ref={ref}
      type="button"
      role={role}
      className={windowSplitter({
        className,
        reversed,
        dragging,
        vertical,
        disableFixed,
      })}
    />
  );
});
