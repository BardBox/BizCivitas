
export const theme = {
  colors: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5', 
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main primary - orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main secondary - green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main accent - amber/yellow
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main success
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main warning
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Main error
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  flatUI: {
    // Brand-focused flat UI colors
    background: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#f8f9fa',
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#6b7280',
      inverse: '#ffffff'
    },
    button: {
      primary: '#f97316', // Orange
      primaryHover: '#ea580c',
      secondary: '#22c55e', // Green
      secondaryHover: '#16a34a',
      success: '#22c55e',
      successHover: '#16a34a',
      warning: '#f59e0b',
      warningHover: '#d97706',
      danger: '#ef4444',
      dangerHover: '#dc2626'
    },
    card: {
      background: '#ffffff',
      border: '#e5e7eb',
      shadow: '0 1px 3px rgba(0,0,0,0.1)'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  }
} as const;

// Type-safe theme access
export type Theme = typeof theme;
export type ColorShade = keyof typeof theme.colors.primary;

// Helper functions for easy color access
export const getColor = (color: keyof typeof theme.colors, shade: ColorShade = 500) => {
  return theme.colors[color][shade];
};

export const getFlatColor = (path: string) => {
  const keys = path.split('.');
  let value: any = theme.flatUI;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};
