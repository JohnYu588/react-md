"use client";

import { type TableHTMLAttributes, forwardRef, useMemo } from "react";

import { TableConfigProvider } from "./TableConfigurationProvider.js";
import { table } from "./tableStyles.js";
import { type TableConfigContext, type TableConfiguration } from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-table-background-color"?: string;
    "--rmd-table-border-size"?: string | number;
    "--rmd-table-border-color"?: string;
    "--rmd-table-header-background-color"?: string;
    "--rmd-table-cell-color"?: string;
    "--rmd-table-cell-height"?: string | number;
    "--rmd-table-cell-horizontal-padding"?: string | number;
    "--rmd-table-cell-vertical-padding"?: string | number;
    "--rmd-table-header-cell-height"?: string | number;
    "--rmd-table-hover-color"?: string;
    "--rmd-table-selected-color"?: string;
    "--rmd-table-sticky-cell"?: string | number;
    "--rmd-table-sticky-header"?: string | number;
    "--rmd-table-sticky-footer"?: string | number;
    "--rmd-table-sticky-background-color"?: string;
  }
}

export interface TableProps
  extends TableHTMLAttributes<HTMLTableElement>,
    TableConfiguration {}

/**
 * **Client Component**
 *
 * @example Responsive Example
 * ```tsx
 * import { Table } from "@react-md/core/table/Table";
 * import { TableBody } from "@react-md/core/table/TableBody";
 * import { TableCell } from "@react-md/core/table/TableCell";
 * import { TableContainer } from "@react-md/core/table/TableContainer";
 * import { TableHeader } from "@react-md/core/table/TableHeader";
 * import { TableRow } from "@react-md/core/table/TableRow";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TableContainer>
 *       <Table>
 *         <TableHeader>
 *           <TableRow>
 *             <TableCell>Header 1</TableCell>
 *             <TableCell>Header 2</TableCell>
 *             <TableCell>Header 3</TableCell>
 *           </TableRow>
 *         </TableHeader>
 *         <TableBody>
 *           <TableRow>
 *             <TableCell>Row 1 Cell 1</TableCell>
 *             <TableCell>Row 1 Cell 2</TableCell>
 *             <TableCell>Row 1 Cell 3</TableCell>
 *           </TableRow>
 *           <TableRow>
 *             <TableCell>Row 2 Cell 1</TableCell>
 *             <TableCell>Row 2 Cell 2</TableCell>
 *             <TableCell>Row 2 Cell 3</TableCell>
 *           </TableRow>
 *           <TableRow>
 *             <TableCell>Row 3 Cell 1</TableCell>
 *             <TableCell>Row 3 Cell 2</TableCell>
 *             <TableCell>Row 3 Cell 3</TableCell>
 *           </TableRow>
 *         </TableBody>
 *       </Table>
 *     </TableContainer>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/table | Table Demos}
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table(props, ref) {
    const {
      className,
      children,
      dense = false,
      hAlign = "left",
      vAlign = "middle",
      lineWrap = false,
      fullWidth = false,
      disableHover = false,
      disableBorders = false,
      ...remaining
    } = props;

    const configuration = useMemo<TableConfigContext>(
      () => ({
        dense,
        header: false,
        hAlign,
        vAlign,
        lineWrap,
        disableHover,
        disableBorders,
      }),
      [dense, hAlign, vAlign, lineWrap, disableHover, disableBorders]
    );

    return (
      <TableConfigProvider value={configuration}>
        <table
          {...remaining}
          ref={ref}
          className={table({ dense, fullWidth, className })}
        >
          {children}
        </table>
      </TableConfigProvider>
    );
  }
);
