import { cnb } from "cnbuilder";

import { type BackgroundColor, cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-toast");

declare module "react" {
  interface CSSProperties {
    "--rmd-toast-color"?: string;
    "--rmd-toast-background-color"?: string;
    "--rmd-toast-offset"?: string | number;
  }
}

/**
 * @since 6.3.1
 */
export interface BaseToastClasNameOptions {
  className?: string;

  /** @defaultValue `"surface"` */
  theme?: BackgroundColor;
}

/**
 * @since 6.0.0
 * @since 6.3.1 Extends BaseToastClasNameOptions
 */
export interface ToastClassNameOptions extends BaseToastClasNameOptions {
  /** @defaultValue `false` */
  action?: boolean;
  /** @defaultValue `false` */
  paused?: boolean;
  /** @defaultValue `false` */
  stacked?: boolean;
  /** @defaultValue `false` */
  reordered?: boolean;
  /** @defaultValue `false` */
  closeButton?: boolean;
}

/**
 * @since 6.0.0
 */
export function toast(options: ToastClassNameOptions = {}): string {
  const {
    className,
    theme = "surface",
    action,
    paused,
    stacked,
    reordered,
    closeButton,
  } = options;

  return cnb(
    styles({
      x: closeButton,
      action,
      paused,
      "small-gap": closeButton && action,
      stacked,
      reordered: stacked && reordered,
    }),
    cssUtils({
      backgroundColor:
        theme !== "surface" && theme !== "current-color" ? theme : undefined,
    }),
    className
  );
}
