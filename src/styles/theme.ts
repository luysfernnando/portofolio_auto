import { Theme } from '../types';

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#0284c7',
    secondary: '#0369a1',
    accent: '#38bdf8',
    background: '#ffffff',
    surface: '#f0f9ff',
    mutedSurface: '#e0f2fe',
    text: '#0a0a0a',
    textSecondary: '#374151',
    border: '#e2e8f0',
    inverse: '#ffffff',
    overlay: '#ffffffcc',
    shadow: '#0284c724',
    success: '#2F7D55',
    warning: '#B88634',
    error: '#A33A2B',
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    primary: '#D8795A',
    secondary: '#9CC4AC',
    accent: '#D6AA58',
    background: '#11100E',
    surface: '#1B1915',
    mutedSurface: '#28231C',
    text: '#F8F2EA',
    textSecondary: '#E0D7CC',
    border: '#383126',
    inverse: '#11100E',
    overlay: '#11100EE6',
    shadow: '#00000066',
    success: '#68B486',
    warning: '#D6AA58',
    error: '#E06B58',
  },
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};
