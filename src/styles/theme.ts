import { Theme } from '../types';

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#7A2E1D',
    secondary: '#20382F',
    accent: '#B88634',
    background: '#F5F0E8',
    surface: '#FFFDF8',
    mutedSurface: '#E8DFD2',
    text: '#171511',
    textSecondary: '#6F665A',
    border: '#D9CEC0',
    inverse: '#FFFDF8',
    overlay: '#F5F0E8CC',
    shadow: '#17151124',
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
