"use client";
import React, { useEffect, useRef, useState } from 'react';
import { type Locale, useLanguage } from '../../context/LanguageContext';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.65rem;
  height: 2.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;

  @media (max-width: 520px) {
    height: 2.25rem;
    padding: 0 0.55rem;
    font-size: 0.72rem;
  }
`;

const Menu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1rem 2rem ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  z-index: 100;
`;

const Option = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.9rem;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  background: ${({ theme, $active }) => $active ? theme.colors.background : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FlagUS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="13" aria-hidden="true">
    <clipPath id="us-clip"><rect width="60" height="30" /></clipPath>
    <g clipPath="url(#us-clip)">
      <rect width="60" height="30" fill="#B22234" />
      {[...Array(7)].map((_, i) => (
        <rect key={i} y={i * 30 / 6.5 + 30 / 13} width="60" height={30 / 13} fill="#fff" />
      ))}
      <rect width="24" height="16" fill="#3C3B6E" />
      {[0, 1, 2, 3, 4].map(row =>
        [...Array(row % 2 === 0 ? 6 : 5)].map((_, i) => (
          <circle
            key={`${row}-${i}`}
            cx={row % 2 === 0 ? i * 4 + 2 : i * 4 + 4}
            cy={row * 3.2 + 1.6}
            r="0.9"
            fill="#fff"
          />
        ))
      )}
    </g>
  </svg>
);

const FlagBR = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 42" width="20" height="14" aria-hidden="true">
    <rect width="60" height="42" fill="#009C3B" />
    <polygon points="30,4 56,21 30,38 4,21" fill="#FFDF00" />
    <circle cx="30" cy="21" r="10" fill="#002776" />
    <path d="M21,18 Q30,24 39,18" stroke="#fff" strokeWidth="1.5" fill="none" />
  </svg>
);

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="20" height="13" aria-hidden="true">
    <rect width="60" height="40" fill="#c60b1e" />
    <rect y="10" width="60" height="20" fill="#ffc400" />
  </svg>
);

const localeOptions: { key: Locale; Flag: () => React.JSX.Element; label: string }[] = [
  { key: 'en_US', Flag: FlagUS, label: 'EN' },
  { key: 'pt_BR', Flag: FlagBR, label: 'BR' },
  { key: 'es_ES', Flag: FlagES, label: 'ES' },
];

export const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const current = localeOptions.find(l => l.key === locale)!;

  return (
    <Wrapper ref={wrapperRef}>
      <Button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Select language"
        aria-expanded={open}
      >
        <current.Flag />
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronDown size={12} style={{ opacity: 0.6 }} />
        </motion.span>
      </Button>

      <AnimatePresence>
        {open && (
          <Menu
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {localeOptions.map(opt => (
              <Option
                key={opt.key}
                $active={opt.key === locale}
                onClick={() => { setLocale(opt.key); setOpen(false); }}
              >
                <opt.Flag />
                <span>{t(`lang.${opt.key}`)}</span>
              </Option>
            ))}
          </Menu>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
