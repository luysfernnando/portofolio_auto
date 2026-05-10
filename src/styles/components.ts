import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Section = styled.section`
  padding: 6rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  font-weight: 650;
  text-align: left;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 12ch;

  &::after {
    content: '';
    display: block;
    width: 4rem;
    height: 1px;
    margin-top: 1rem;
    background: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const Button = styled.button<{
  $variant?: 'primary' | 'secondary' | 'outline';
  $size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 650;
  border-radius: 999px;
  transition: all 0.2s ease;
  text-decoration: none;
  letter-spacing: 0.01em;
  max-width: 100%;

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.text};
          color: ${theme.colors.inverse};
          border: 1px solid ${theme.colors.text};
          &:hover {
            background: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.inverse};
          border: 1px solid ${theme.colors.secondary};
          &:hover {
            background: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            transform: translateY(-1px);
          }
        `;
      case 'outline': {
        const outlineColor = theme.isDark ? '#60a5fa' : theme.colors.primary;
        return `
          background: transparent;
          color: ${outlineColor};
          border: 1.5px solid ${outlineColor};
          &:hover {
            background: ${outlineColor}15;
            border-color: ${outlineColor};
            transform: translateY(-1px);
          }
        `;
      }
    }
  }}

  ${({ $size = 'md' }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 0.55rem 1rem;
          font-size: 0.875rem;
        `;
      case 'md':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
      case 'lg':
        return `
          padding: 0.95rem 1.6rem;
          font-size: 1rem;
        `;
    }
  }}
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1.5rem 3rem ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 2rem 4rem ${({ theme }) => theme.colors.shadow};
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 1 }) => columns}, 1fr);
  gap: ${({ gap = '2rem' }) => gap};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = '0' }) => gap};
  flex-wrap: ${({ wrap = false }) => (wrap ? 'wrap' : 'nowrap')};
`;

export const Badge = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 650;
  border-radius: 9999px;
  background: ${({ color, theme }) => color || theme.colors.mutedSurface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ color, theme }) => color || theme.colors.border};
`;
