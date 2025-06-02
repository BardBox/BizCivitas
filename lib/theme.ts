
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a', // Main secondary
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef', // Main accent
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
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
    // Flat UI specific colors - no gradients, clean and minimal
    background: '#ecf0f1',
    surface: '#ffffff',
    surfaceAlt: '#f8f9fa',
    border: '#bdc3c7',
    borderLight: '#ecf0f1',
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
      muted: '#95a5a6',
      inverse: '#ffffff'
    },
    button: {
      primary: '#3498db',
      primaryHover: '#2980b9',
      secondary: '#95a5a6',
      secondaryHover: '#7f8c8d',
      success: '#2ecc71',
      successHover: '#27ae60',
      warning: '#f39c12',
      warningHover: '#e67e22',
      danger: '#e74c3c',
      dangerHover: '#c0392b'
    },
    card: {
      background: '#ffffff',
      border: '#ecf0f1',
      shadow: '0 2px 4px rgba(0,0,0,0.1)'
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
