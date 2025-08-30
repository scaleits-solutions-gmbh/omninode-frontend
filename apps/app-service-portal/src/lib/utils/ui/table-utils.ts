import { ColumnDef } from "@tanstack/react-table";

/**
 * Get column style from column definition for consistent table column sizing
 * @param columnDef - The column definition containing size and minSize properties
 * @returns Object with width and minWidth CSS properties
 */
export const getColumnStyle = <T>(columnDef: ColumnDef<T>) => {
  return {
    width: columnDef.size ? `${columnDef.size}%` : 'auto',
    minWidth: columnDef.minSize ? `${columnDef.minSize}px` : 'auto',
  }
}