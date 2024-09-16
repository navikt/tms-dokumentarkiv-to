export function readableFileSize(fileSizeInput: number) {
  const DEFAULT_SIZE = 0;
  const fileSize = fileSizeInput ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kB`;
  }

  const sizeInKb = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} MB`;
  } else {
    return `${sizeInKb.toFixed(2)} kB`;
  }
}