import { cnb } from "cnbuilder";

import {
  type OutlineColor,
  type TextColor,
  type ThemeColor,
  cssUtils,
} from "../cssUtils.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-button-background-color"?: string;
    "--rmd-button-color"?: string;
    "--rmd-button-border-radius"?: string | number;
    "--rmd-button-contained-background-color"?: string;
    "--rmd-button-contained-color"?: string;
    "--rmd-button-text-horizontal-padding"?: string | number;
    "--rmd-button-text-vertical-padding"?: string | number;
    "--rmd-button-text-min-height"?: string | number;
    "--rmd-button-text-min-width"?: string | number;
    "--rmd-button-text-border-radius"?: string | number;
    "--rmd-button-icon-size"?: string | number;
    "--rmd-button-icon-padding"?: string | number;
    "--rmd-button-icon-font-size"?: string | number;
    "--rmd-button-icon-border-radius"?: string | number;
    "--rmd-button-icon-square-border-radius"?: string | number;
  }
}

const styles = bem("rmd-button");

/**
 * When this is set to `"text"`, the size of the button will be determined by
 * the content and will be more block-like. Icons can still be rendered in
 * `"text"` buttons and will have spacing automatically applied between other
 * content in the button.
 *
 * When this is set to `"icon"`, the button will be equal height/width and
 * circular.
 */
export type ButtonType = "text" | "icon" | "icon-square";

/**
 * One of the valid material design default button themes that can be used. This
 * will update the general look and feel by updating the colors within the
 * button while the `ButtonThemeType` will update the borders or box shadow.
 */
export type ButtonTheme = ThemeColor | "clear" | "disabled";

/**
 * When this is set to `"flat"`, the button will have no `background-color`,
 * `border`, and `box-shadow`. It will only set the `color` to the
 * {@link ButtonTheme}.
 *
 * When this is set to `"outline"`, the button will have no `background-color`,
 * but gain a `border` and `color` set to the {@link ButtonTheme}.
 *
 * When this is set to `"contained"`, the button will set the `background-color`
 * to the {@link ButtonTheme}, add some `box-shadow`, and set the `color` to
 * either `#000` or `#fff`. (The `color` defaults to whichever value has the
 * highest contrast ratio with the `background-color`)
 */
export type ButtonThemeType = "flat" | "outline" | "contained";

/** @since 6.0.0 */
export interface ButtonClassNameThemeOptions {
  className?: string;

  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * @see {@link ButtonTheme} for information about the different types.
   * @defaultValue `"text"`
   */
  buttonType?: ButtonType;

  /** @defaultValue `"clear"` */
  theme?: ButtonTheme;

  /**
   * @see {@link ButtonThemeType} for information about the theming behavior.
   * @defaultValue `"flat"`
   */
  themeType?: ButtonThemeType;

  /**
   * This will display the button as an icon button until the tablet breakpoint
   * which will then display as a button with an icon.
   *
   * @defaultValue `false`
   */
  responsive?: boolean;

  /**
   * @defaultValue `"normal"`
   */
  iconSize?: "small" | "normal" | "large";
}

/**
 * @since 6.0.0
 */
export interface ButtonClassNameOptions extends ButtonClassNameThemeOptions {
  /** @defaultValue `false` */
  pressed?: boolean;
  pressedClassName?: string;
}

/**
 * Creates a button theme based on the button theming props. This is really just
 * used so that other elements like clickable `<div>`s or `<input type="file">`
 * can look like buttons.
 *
 * @param options - An object containing the themeable button props to generate a
 * button theme className.
 * @returns a string of class names to create an element with a button theme.
 * @since 6.0.0 This used to be called `buttonThemeClassNames`.
 */
export function button(options: ButtonClassNameOptions = {}): string {
  const {
    theme: propTheme = "clear",
    themeType = "flat",
    iconSize,
    buttonType = "text",
    disabled: propDisabled = false,
    responsive,
    pressed = false,
    pressedClassName,
    className,
  } = options;

  const theme = propTheme === "disabled" ? "clear" : propTheme;
  const disabled = propDisabled || propTheme === "disabled";
  const text = buttonType === "text" && !responsive && !iconSize;
  const icon = !text;
  const outline = themeType === "outline";
  const contained = themeType === "contained";
  const clear = theme === "clear";
  const isThemed = !disabled && !clear;

  let textColor: ThemeColor | TextColor | undefined;
  let outlineColor: OutlineColor | undefined;
  let backgroundColor: ThemeColor | undefined;
  if (isThemed && !contained) {
    textColor = theme;
  } else if (disabled) {
    textColor = "text-disabled";
  }
  if (isThemed && contained) {
    backgroundColor = theme;
  }
  if (outline) {
    outlineColor = clear ? "greyscale" : theme;
  }

  return cnb(
    styles({
      text,
      icon,
      "icon-square": buttonType === "icon-square",
      disabled,
      contained: !disabled && contained,
      pressed: contained && pressed,
      responsive,
      small: icon && iconSize === "small",
      large: icon && iconSize === "large",
    }),
    pressedClassName,
    cssUtils({
      surface: true,
      textColor,
      outlineColor,
      backgroundColor,
    }),
    className
  );
}

/** @since 6.0.0 */
export interface ButtonUnstyledClassNameOptions {
  className?: string;
}

/**
 * This requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @since 6.0.0
 */
export function buttonUnstyled(
  options: ButtonUnstyledClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-button-unstyled", className);
}
