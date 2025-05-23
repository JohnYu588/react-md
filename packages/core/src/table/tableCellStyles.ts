import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import {
  type TableCellHorizontalAlignment,
  type TableCellVerticalAlignment,
} from "./types.js";

/** @since 6.0.0 */
export interface TableCellClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the cell is rendered as a `<th>` so that the correct
   * sticky styles can be applied.
   *
   * @defaultValue `false`
   */
  header?: boolean;

  /**
   * Set this to true if the cell is rendered in a `<thead>` so that the correct
   * sticky styles can be applied.
   *
   * @defaultValue `header`
   */
  isInTableHeader?: boolean;

  /** @defaultValue `false` */
  grow?: boolean;

  /** @defaultValue `false` */
  sticky?: boolean;

  /** @defaultValue `false` */
  inputToggle?: boolean;

  hAlign?: TableCellHorizontalAlignment;
  vAlign?: TableCellVerticalAlignment;

  /** @defaultValue `true` */
  lineWrap?: boolean;

  /**
   * @defaultValue `"horizontal"`
   */
  padding?: "horizontal" | "vertical" | "none";
}

/**
 * @since 6.0.0
 */
export function tableCell(options: TableCellClassNameOptions = {}): string {
  const {
    grow,
    sticky,
    header,
    inputToggle,
    hAlign = "left",
    vAlign = "middle",
    lineWrap = true,
    padding = "horizontal",
    isInTableHeader = header,
    className,
  } = options;

  // using `&&` instead of `bem` since the latest version of typescript does not
  // support setting the same object key (empty string)
  const p = "rmd-table-cell--";
  return cnb(
    "rmd-table-cell",
    grow && `${p}grow`,
    header && `${p}header`,
    sticky && `${p}sticky`,
    inputToggle && `${p}input-toggle`,
    sticky && (!isInTableHeader || inputToggle) && `${p}sticky-cell`,
    sticky && isInTableHeader && `${p}sticky-header`,
    sticky && isInTableHeader && inputToggle && `${p}header-cell`,
    vAlign && vAlign !== "middle" && `${p}${vAlign}`,
    padding === "vertical" && `${p}v-padding`,
    padding === "none" && `${p}no-padding`,
    cssUtils({
      textAlign: hAlign,
      textOverflow: lineWrap ? undefined : "ellipsis",
    }),
    className
  );
}
