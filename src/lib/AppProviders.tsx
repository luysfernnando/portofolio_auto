"use client";
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeStateProvider, useThemeContext } from '../context/ThemeContext';
import { GlobalStyle } from '../styles/GlobalStyle';
import { getTheme } from '../styles/theme';

const AppProvidersContent = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useThemeContext();
  const theme = getTheme(isDark);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {children}
    </StyledThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeStateProvider>
      <AppProvidersContent>{children}</AppProvidersContent>
    </ThemeStateProvider>
  );
};
