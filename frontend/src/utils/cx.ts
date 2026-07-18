/** Join conditional class names. Owned utility — no classnames dependency. */
export const cx = (...parts: ReadonlyArray<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');
