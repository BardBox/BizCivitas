
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
        // Brand colors
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        neutral: theme.colors.neutral,
        
        // Brand-focused flat UI colors
        'flat-bg': theme.flatUI.background,
        'flat-surface': theme.flatUI.surface,
        'flat-surface-alt': theme.flatUI.surfaceAlt,
        'flat-border': theme.flatUI.border,
        'flat-border-light': theme.flatUI.borderLight,
        'flat-text-primary': theme.flatUI.text.primary,
        'flat-text-secondary': theme.flatUI.text.secondary,
        'flat-text-muted': theme.flatUI.text.muted,
        'flat-text-inverse': theme.flatUI.text.inverse,
        
        // Brand buttons
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

        // Brand specific colors
        'brand-orange': '#f97316',
        'brand-orange-dark': '#ea580c',
        'brand-green': '#22c55e',
        'brand-green-dark': '#16a34a',
        'brand-yellow': '#f59e0b',
        'brand-yellow-dark': '#d97706',
      },
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      maxWidth: {
        'container': '1440px',
      }
    },
  },
  plugins: [],
};
