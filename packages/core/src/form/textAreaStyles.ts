import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";
import {
  type TextFieldClassNameOptions,
  textField,
} from "./textFieldStyles.js";
import { type TextAreaResize } from "./useResizingTextArea.js";

const styles = bem("rmd-textarea");
const containerStyles = bem("rmd-textarea-container");

/**
 * @since 6.0.0
 */
export interface TextareaClassNameOptions extends TextFieldClassNameOptions {
  className?: string;

  /**
   * This should not be used externally and is only used for creating the hidden
   * textarea mask for the auto resizing behavior.
   *
   * @defaultValue `false`
   */
  mask?: boolean;

  /**
   * @see {@link TextAreaResize}
   * @defaultValue `"auto"`
   */
  resize?: TextAreaResize;

  /**
   * Set this to `true` if the textarea should display a scrollbar.
   *
   * @defaultValue `false`
   */
  scrollable?: boolean;
}

/**
 * @since 6.0.0
 */
export function textArea(options: TextareaClassNameOptions = {}): string {
  const {
    className,
    mask,
    resize = "auto",
    scrollable,
    placeholderHidden,
  } = options;

  return cnb(
    textField({ placeholderHidden }),
    styles({
      rh: resize === "horizontal",
      rv: resize === "vertical",
      rn: resize === "auto" || resize === "none",
      mask,
      scrollable: scrollable || resize === "none",
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface TextareaContainerClassNameOptions {
  className?: string;
  height?: boolean;
  disabled?: boolean;
  animate?: boolean;
  underlineLabelled?: boolean;
}

/**
 * @since 6.0.0
 */
export function textAreaContainer(
  options: TextareaContainerClassNameOptions = {}
): string {
  const { className, height, animate, disabled, underlineLabelled } = options;

  return cnb(
    containerStyles({
      height,
      animate,
      cursor: !disabled,
      "underline-labelled": underlineLabelled,
    }),
    className
  );
}
