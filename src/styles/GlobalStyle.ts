import { createGlobalStyle } from 'styled-components';
import { Theme } from '../types';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    max-width: 100vw;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.background};
  }

  body {
    font-family: 'IBM Plex Sans', 'Aptos', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:
      radial-gradient(circle at top left, ${({ theme }) => theme.colors.accent}14, transparent 28rem),
      linear-gradient(135deg, ${({ theme }) => theme.colors.background} 0%, ${({ theme }) => theme.colors.mutedSurface} 100%);
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    max-width: 100vw;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  main {
    width: 100%;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: ${({ theme }) => (theme.isDark ? 0.14 : 0.2)};
    background-image:
      linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
    background-size: 4rem 4rem;
    mask-image: linear-gradient(to bottom, black, transparent 72%);
  }

  body > * {
    position: relative;
    z-index: 1;
  }

  code {
    font-family: 'JetBrains Mono', 'Fira Code', source-code-pro, Menlo, Monaco, Consolas, monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Newsreader', Georgia, serif;
    font-weight: 650;
    line-height: 1.05;
    margin-bottom: 0.5em;
    letter-spacing: -0.035em;
  }

  p {
    margin-bottom: 1em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover {
    opacity: 0.82;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent}55;
  }
`;
