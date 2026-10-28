export const fontSize = {
  title: 28,
  header: 17,
  name: 16,
  body: 15,
  small: 13,
  tiny: 12,
  big: 24,
} as const;

export const fontWeight = {
  bold: '700',
  semibold: '600',
  medium: '500',
  regular: '400',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 } as const;

export const radius = { input: 12, card: 14, table: 16, pill: 999 } as const;

export const shadow = {
  elevation: 2,
  shadowColor: '#1C1917',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
} as const;

export const size = { buttonLg: 52, buttonSm: 38, hit: 44, input: 50 } as const;
