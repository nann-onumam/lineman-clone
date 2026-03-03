export const colors = {
  primary: '#06C167',
  primaryDark: '#00994D',
  secondary: '#FFC93C',

  background: '#FFFFFF',
  surface: '#F6F7F9',
  border: '#E5E7EB',

  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textInverse: '#FFFFFF',

  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB',
} as const;

export type Colors = typeof colors;
