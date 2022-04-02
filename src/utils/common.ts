export const isBrowser = typeof window !== 'undefined';

export const removeTrailingSlash = (path: string) =>
  path === `/` ? path : path.replace(/\/$/, ``);
