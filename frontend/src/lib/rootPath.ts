import getRouterBasename from './router';

/**
 * Prefix an absolute, root-relative URL (e.g. `/assets/foo.js`) with the
 * `CHAINLIT_ROOT_PATH` the app is served under.
 *
 * Vite bakes asset URLs such as `?url` imports into the JS bundle as
 * `/assets/...`. The backend only rewrites the `href`/`src` attributes of
 * `index.html`, so those URLs 404 when the app is mounted under a root path.
 */
export const withRootPath = (url: string): string => {
  const basename = getRouterBasename().replace(/\/+$/, '');

  if (!basename || !url.startsWith('/') || url.startsWith('//')) {
    return url;
  }
  if (url === basename || url.startsWith(`${basename}/`)) {
    return url;
  }
  return basename + url;
};
