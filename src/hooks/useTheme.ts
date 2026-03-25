"use client";
import { useThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  return useThemeContext();
};

