export interface Theme {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    mutedSurface: string;
    text: string;
    textSecondary: string;
    border: string;
    inverse: string;
    overlay: string;
    shadow: string;
    success: string;
    warning: string;
    error: string;
  };
}
