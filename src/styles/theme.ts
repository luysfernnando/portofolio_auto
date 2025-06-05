import { Theme } from '../types';

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#2563eb',     // Blue-600
    secondary: '#7c3aed',   // Violet-600
    accent: '#06b6d4',      // Cyan-500
    background: '#ffffff',   // White
    surface: '#f8fafc',     // Slate-50
    text: '#0f172a',        // Slate-900
    textSecondary: '#64748b', // Slate-500
    border: '#e2e8f0',      // Slate-200
    success: '#10b981',     // Emerald-500
    warning: '#f59e0b',     // Amber-500
    error: '#ef4444',       // Red-500
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#3b82f6',     // Blue-500
    secondary: '#8b5cf6',   // Violet-500
    accent: '#06b6d4',      // Cyan-500
    background: '#0f172a',  // Slate-900
    surface: '#1e293b',     // Slate-800
    text: '#f1f5f9',        // Slate-100
    textSecondary: '#94a3b8', // Slate-400
    border: '#334155',      // Slate-700
    success: '#10b981',     // Emerald-500
    warning: '#f59e0b',     // Amber-500
    error: '#ef4444',       // Red-500
  },
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};
