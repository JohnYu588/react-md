import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-link");

declare module "react" {
  interface CSSProperties {
    "--rmd-link-color"?: string;
    "--rmd-link-visited-color"?: string;
    "--rmd-link-hover-color"?: string;
  }
}

/** @since 6.0.0 */
export interface LinkClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  flex?: boolean;
}

/**
 * This really doesn't do much at this time since it only merges `rmd-link` with
 * the optional className. This was mostly added just for convention purposes.
 *
 * @since 6.0.0
 */
export function link(options: LinkClassNameOptions = {}): string {
  const { flex, className } = options;

  return cnb(styles({ flex }), className);
}

/** @since 6.0.0 */
export interface SkipToMainContentClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  unstyled?: boolean;
}

/**
 * @since 6.0.0
 */
export function skipToMainContent(
  options: SkipToMainContentClassNameOptions = {}
): string {
  const { unstyled = false, className } = options;

  return cnb(
    styles({
      skip: true,
      "skip-styled": !unstyled,
    }),
    className
  );
}
