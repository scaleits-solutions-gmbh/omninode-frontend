/**
 * Formats a file size in bytes to a human-readable string with appropriate unit
 * @param bytes - The size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string (e.g., "1.5 GB", "256 MB", "512 Bytes")
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";
  if (bytes < 0) return "Invalid size";
  if (!Number.isFinite(bytes)) return "Unknown";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // Calculate the appropriate unit index
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure we don't exceed the available units
  const unitIndex = Math.min(i, sizes.length - 1);

  // Calculate the formatted value
  const value = bytes / Math.pow(k, unitIndex);

  // Format the number with specified decimal places
  const formattedValue = parseFloat(value.toFixed(decimals));

  return `${formattedValue} ${sizes[unitIndex]}`;
};

/**
 * Formats a file size in bytes specifically for storage/display contexts
 * This version handles edge cases and provides more consistent output
 * @param bytes - The size in bytes (can be string, number, or null/undefined)
 * @param decimals - Number of decimal places (default: 2)
 * @param inputUnit - The unit of the input value ('bytes', 'kb', 'mb', 'gb', 'auto')
 * @returns Formatted size string or fallback value
 */
export const formatStorageSize = (
  bytes: string | number | null | undefined,
  decimals: number = 2,
  inputUnit: 'bytes' | 'kb' | 'mb' | 'gb' | 'auto' = 'auto'
): string => {
  if (bytes === null || bytes === undefined) return "—";

  let numBytes: number;
  if (typeof bytes === "string") {
    // Remove any non-numeric characters except decimal point
    const cleanStr = bytes.replace(/[^\d.]/g, '');
    numBytes = parseFloat(cleanStr);
  } else {
    numBytes = bytes;
  }

  if (isNaN(numBytes)) return "—";

  // Convert to bytes based on input unit
  let bytesValue: number;
  switch (inputUnit) {
    case 'bytes':
      bytesValue = numBytes;
      break;
    case 'kb':
      bytesValue = numBytes * 1024;
      break;
    case 'mb':
      bytesValue = numBytes * 1024 * 1024;
      break;
    case 'gb':
      bytesValue = numBytes * 1024 * 1024 * 1024;
      break;
    case 'auto':
    default:
      // Auto-detect: if value is small (< 1000), assume it's in GB
      // if medium (1000-1000000), assume MB
      // if large (> 1000000), assume bytes
      // This is a heuristic and may need adjustment based on actual data patterns
      if (numBytes < 1000) {
        bytesValue = numBytes * 1024 * 1024 * 1024; // Assume GB
      } else if (numBytes < 1000000) {
        bytesValue = numBytes * 1024 * 1024; // Assume MB
      } else {
        bytesValue = numBytes; // Assume bytes
      }
      break;
  }

  return formatFileSize(bytesValue, decimals);
};
