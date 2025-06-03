
import { theme } from './lib/theme.ts';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Primary brand colors with all shades
        primary: {
          50: theme.colors.primary[50],
          100: theme.colors.primary[100],
          200: theme.colors.primary[200],
          300: theme.colors.primary[300],
          400: theme.colors.primary[400],
          500: theme.colors.primary[500],
          600: theme.colors.primary[600],
          700: theme.colors.primary[700],
          800: theme.colors.primary[800],
          900: theme.colors.primary[900],
          DEFAULT: theme.colors.primary[500],
        },
        
        // Secondary brand colors with all shades
        secondary: {
          50: theme.colors.secondary[50],
          100: theme.colors.secondary[100],
          200: theme.colors.secondary[200],
          300: theme.colors.secondary[300],
          400: theme.colors.secondary[400],
          500: theme.colors.secondary[500],
          600: theme.colors.secondary[600],
          700: theme.colors.secondary[700],
          800: theme.colors.secondary[800],
          900: theme.colors.secondary[900],
          DEFAULT: theme.colors.secondary[500],
        },
        
        // Accent colors with all shades
        accent: {
          50: theme.colors.accent[50],
          100: theme.colors.accent[100],
          200: theme.colors.accent[200],
          300: theme.colors.accent[300],
          400: theme.colors.accent[400],
          500: theme.colors.accent[500],
          600: theme.colors.accent[600],
          700: theme.colors.accent[700],
          800: theme.colors.accent[800],
          900: theme.colors.accent[900],
          DEFAULT: theme.colors.accent[500],
        },
        
        // Success colors with all shades
        success: {
          50: theme.colors.success[50],
          100: theme.colors.success[100],
          200: theme.colors.success[200],
          300: theme.colors.success[300],
          400: theme.colors.success[400],
          500: theme.colors.success[500],
          600: theme.colors.success[600],
          700: theme.colors.success[700],
          800: theme.colors.success[800],
          900: theme.colors.success[900],
          DEFAULT: theme.colors.success[500],
        },
        
        // Warning colors with all shades
        warning: {
          50: theme.colors.warning[50],
          100: theme.colors.warning[100],
          200: theme.colors.warning[200],
          300: theme.colors.warning[300],
          400: theme.colors.warning[400],
          500: theme.colors.warning[500],
          600: theme.colors.warning[600],
          700: theme.colors.warning[700],
          800: theme.colors.warning[800],
          900: theme.colors.warning[900],
          DEFAULT: theme.colors.warning[500],
        },
        
        // Error colors with all shades
        error: {
          50: theme.colors.error[50],
          100: theme.colors.error[100],
          200: theme.colors.error[200],
          300: theme.colors.error[300],
          400: theme.colors.error[400],
          500: theme.colors.error[500],
          600: theme.colors.error[600],
          700: theme.colors.error[700],
          800: theme.colors.error[800],
          900: theme.colors.error[900],
          DEFAULT: theme.colors.error[500],
        },
        
        // Neutral colors with all shades
        neutral: {
          50: theme.colors.neutral[50],
          100: theme.colors.neutral[100],
          200: theme.colors.neutral[200],
          300: theme.colors.neutral[300],
          400: theme.colors.neutral[400],
          500: theme.colors.neutral[500],
          600: theme.colors.neutral[600],
          700: theme.colors.neutral[700],
          800: theme.colors.neutral[800],
          900: theme.colors.neutral[900],
          DEFAULT: theme.colors.neutral[500],
        },
        
        // Flat UI colors for consistent design system
        'flat-bg': theme.flatUI.background,
        'flat-surface': theme.flatUI.surface,
        'flat-surface-alt': theme.flatUI.surfaceAlt,
        'flat-border': theme.flatUI.border,
        'flat-border-light': theme.flatUI.borderLight,
        
        // Flat UI text colors
        'flat-text-primary': theme.flatUI.text.primary,
        'flat-text-secondary': theme.flatUI.text.secondary,
        'flat-text-muted': theme.flatUI.text.muted,
        'flat-text-inverse': theme.flatUI.text.inverse,
        
        // Flat UI button colors
        'flat-btn-primary': theme.flatUI.button.primary,
        'flat-btn-primary-hover': theme.flatUI.button.primaryHover,
        'flat-btn-secondary': theme.flatUI.button.secondary,
        'flat-btn-secondary-hover': theme.flatUI.button.secondaryHover,
        'flat-btn-success': theme.flatUI.button.success,
        'flat-btn-success-hover': theme.flatUI.button.successHover,
        'flat-btn-warning': theme.flatUI.button.warning,
        'flat-btn-warning-hover': theme.flatUI.button.warningHover,
        'flat-btn-danger': theme.flatUI.button.danger,
        'flat-btn-danger-hover': theme.flatUI.button.dangerHover,

        // Brand specific quick access colors
        'brand-orange': theme.colors.primary[500],
        'brand-orange-dark': theme.colors.primary[600],
        'brand-green': theme.colors.secondary[500],
        'brand-green-dark': theme.colors.secondary[600],
        'brand-yellow': theme.colors.accent[500],
        'brand-yellow-dark': theme.colors.accent[600],
      },
      
      // Spacing from theme
      spacing: {
        'xs': theme.spacing.xs,
        'sm': theme.spacing.sm,
        'md': theme.spacing.md,
        'lg': theme.spacing.lg,
        'xl': theme.spacing.xl,
        '2xl': theme.spacing['2xl'],
        '3xl': theme.spacing['3xl'],
      },
      
      // Border radius from theme
      borderRadius: {
        'none': theme.borderRadius.none,
        'sm': theme.borderRadius.sm,
        'md': theme.borderRadius.md,
        'lg': theme.borderRadius.lg,
        'xl': theme.borderRadius.xl,
        '2xl': theme.borderRadius['2xl'],
        'full': theme.borderRadius.full,
      },
      
      // Box shadows from theme
      boxShadow: {
        'none': theme.shadows.none,
        'sm': theme.shadows.sm,
        'md': theme.shadows.md,
        'lg': theme.shadows.lg,
        'xl': theme.shadows.xl,
        // Flat UI card shadow
        'flat-card': theme.flatUI.card.shadow,
      },
      
      // Typography
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      
      // Layout
      maxWidth: {
        'container': '1440px',
      },
      
      // Flat UI card styles
      backgroundColor: {
        'flat-card': theme.flatUI.card.background,
      },
      
      borderColor: {
        'flat-card': theme.flatUI.card.border,
      },
    },
  },
  plugins: [],
};
