import type { ColumnDef } from "@tanstack/react-table";

/**
 * Get CSS style object for table column based on column definition
 */
export function getColumnStyle<TData>(columnDef: ColumnDef<TData, unknown>): React.CSSProperties {
  const style: React.CSSProperties = {};
  
  if (columnDef.size) {
    style.width = `${columnDef.size}%`;
  }
  
  if (columnDef.minSize) {
    style.minWidth = `${columnDef.minSize}px`;
  }
  
  if (columnDef.maxSize) {
    style.maxWidth = `${columnDef.maxSize}px`;
  }
  
  return style;
}
