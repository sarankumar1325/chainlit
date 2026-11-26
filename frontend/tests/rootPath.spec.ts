import { afterEach, describe, expect, it } from 'vitest';

import { withRootPath } from '../src/lib/rootPath';

const setRootPath = (rootPath: string) => {
  const meta = document.createElement('meta');
  meta.setAttribute('property', 'og:root_path');
  meta.setAttribute('content', rootPath);
  document.head.appendChild(meta);
};

describe('withRootPath', () => {
  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('returns the url unchanged when there is no root path', () => {
    expect(withRootPath('/assets/pdf.worker.min-abc.mjs')).toBe(
      '/assets/pdf.worker.min-abc.mjs'
    );
  });

  it('prefixes root-relative urls with the root path', () => {
    setRootPath('/spec_bot');
    expect(withRootPath('/assets/pdf.worker.min-abc.mjs')).toBe(
      '/spec_bot/assets/pdf.worker.min-abc.mjs'
    );
  });

  it('ignores a trailing slash on the root path', () => {
    setRootPath('/spec_bot/');
    expect(withRootPath('/assets/a.mjs')).toBe('/spec_bot/assets/a.mjs');
  });

  it('does not prefix twice', () => {
    setRootPath('/spec_bot');
    expect(withRootPath('/spec_bot/assets/a.mjs')).toBe(
      '/spec_bot/assets/a.mjs'
    );
  });

  it('leaves absolute and protocol-relative urls alone', () => {
    setRootPath('/spec_bot');
    expect(withRootPath('https://cdn.example.com/a.mjs')).toBe(
      'https://cdn.example.com/a.mjs'
    );
    expect(withRootPath('//cdn.example.com/a.mjs')).toBe(
      '//cdn.example.com/a.mjs'
    );
  });
});
