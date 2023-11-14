"use client";
import { forwardRef, type HTMLAttributes } from "react";
import {
  useTableConfig,
  type TableRowConfiguration,
} from "./TableConfigurationProvider.js";
import { tableRow } from "./tableRowStyles.js";

export interface TableRowProps
  extends HTMLAttributes<HTMLTableRowElement>,
    TableRowConfiguration {
  /**
   * Boolean if the current row has been selected and should apply the selected
   * background-color.
   *
   * @defaultValue `false`
   */
  selected?: boolean;

  /**
   * Boolean if the row should be clickable and update the cursor while hovered
   * to be a pointer.
   *
   * @defaultValue `false`
   */
  clickable?: boolean;
}

/**
 * **Client Component**
 *
 * Creates a `<tr>` element with some general styles that are inherited from the
 * base table configuration.
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const {
      className,
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
      children,
      selected = false,
      clickable = false,
      ...remaining
    } = props;

    const { disableHover, disableBorders } = useTableConfig({
      disableHover: propDisableHover,
      disableBorders: propDisableBorders,
    });

    return (
      <tr
        {...remaining}
        ref={ref}
        className={tableRow({
          selected,
          clickable,
          disableHover,
          disableBorders,
          className,
        })}
      >
        {children}
      </tr>
    );
  }
);
