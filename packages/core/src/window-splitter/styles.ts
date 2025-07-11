import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-window-splitter");

declare module "react" {
  interface CSSProperties {
    "--rmd-window-splitter-size"?: string | number;
    "--rmd-window-splitter-background-size"?: string | number;
    "--rmd-window-splitter-x"?: string | number;
    "--rmd-window-splitter-y"?: string | number;
    "--rmd-window-splitter-z"?: string | number;
    "--rmd-window-splitter-position"?: string | number;
    "--rmd-window-splitter-backgrond-color"?: string;
    "--rmd-window-splitter-opacity"?: string | number;
  }
}

/**
 * @since 6.3.1
 */
export interface BaseWindowSplitterClassNameOptions {
  className?: string;

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
 * @since 6.3.1 Extends BaseWindowSplitterClassNameOptions
 */
export interface WindowSplitterClassNameOptions
  extends BaseWindowSplitterClassNameOptions {
  dragging?: boolean;
  reversed?: boolean;
  vertical?: boolean;
}

/**
 * @since 6.0.0
 */
export function windowSplitter(
  options: WindowSplitterClassNameOptions = {}
): string {
  const {
    vertical = false,
    dragging,
    reversed,
    disableFixed,
    className,
  } = options;

  return cnb(
    styles({
      h: !vertical,
      hr: !vertical && reversed,
      v: vertical,
      vr: vertical && reversed,
      a: disableFixed,
      dragging,
    }),
    className
  );
}
