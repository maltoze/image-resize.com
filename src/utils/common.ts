export const isBrowser = typeof window !== 'undefined';

export const removeTrailingSlash = (path: string) =>
  path === `/` ? path : path.replace(/\/$/, ``);

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0Bytes';
  const k = 1024,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + sizes[i];
};
