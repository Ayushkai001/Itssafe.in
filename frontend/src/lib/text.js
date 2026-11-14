import { createElement, Fragment } from 'react';

const COMPOUND = /([A-Za-z0-9/]+(?:-[A-Za-z0-9/]+)+)/g;

/**
 * Keeps hyphenated compounds ("Water-resistant", "Custom-developed") on one line so narrow
 * screens never strand half a word at a line end.
 */
export function keepCompounds(text) {
  if (typeof text !== 'string') return text;
  return text.split(COMPOUND).map((part, i) =>
    i % 2 === 1 ? createElement('span', { key: i, className: 'whitespace-nowrap' }, part) : createElement(Fragment, { key: i }, part),
  );
}
