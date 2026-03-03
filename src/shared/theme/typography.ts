export const typography = {
  heading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
} as const;

export type Typography = typeof typography;