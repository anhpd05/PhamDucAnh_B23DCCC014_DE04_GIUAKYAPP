export const fontSize = {
  caption: 12,
  small: 14,
  body: 16,
  title: 18,
  heading: 22,
  display: 26,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  pill: 999,
} as const;

export const shadow = {
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.12,
  shadowRadius: 3,
} as const;
