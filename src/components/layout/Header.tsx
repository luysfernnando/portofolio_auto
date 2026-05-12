"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { type Locale, useLanguage } from '../../context/LanguageContext';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  ${({ $scrolled, theme }) => $scrolled && `
    background: ${theme.colors.overlay};
    box-shadow: 0 1rem 2rem ${theme.colors.shadow};
  `}
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.5rem;
  max-width: 1180px;
  margin: 0 auto;

  @media (max-width: 520px) {
    padding: 0.75rem 1.25rem;
  }
`;

const Logo = styled(motion.button)`
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: grid;
  gap: 0.1rem;
  text-align: left;

  strong {
    font-family: 'Newsreader', Georgia, serif;
    font-size: 1.35rem;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  span {
    color: ${({ theme }) => (theme.isDark ? '#60a5fa' : theme.colors.primary)};
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 520px) {
    strong { font-size: 1.12rem; }
    span { font-size: 0.56rem; letter-spacing: 0.11em; }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.35rem;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled(motion.button)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.35rem;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover { color: ${({ theme }) => theme.colors.text}; }
  &:hover::after { width: 100%; }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 520px) {
    gap: 0.45rem;
  }
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (max-width: 520px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;

  @media (max-width: 860px) {
    display: none;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.inverse};
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 860px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 999;
`;

const MobileNavLink = styled(motion.button)`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(2rem, 10vw, 4rem);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const MobileSocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const DesktopOnly = styled.div`
  @media (max-width: 860px) {
    display: none;
  }
`;

const LangWrapper = styled.div`
  position: relative;
`;

const LangButton = styled(motion.button)`
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

const LangMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 7.5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1rem 2rem ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  z-index: 100;
`;

const LangOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.9rem;
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

const localeOptions: { key: Locale; flag: string; label: string }[] = [
  { key: 'en_US', flag: '🇺🇸', label: 'EN' },
  { key: 'pt_BR', flag: '🇧🇷', label: 'PT' },
  { key: 'es_ES', flag: '🇪🇸', label: 'ES' },
];

const navItems = [
  { labelKey: 'nav.home', id: 'home' },
  { labelKey: 'nav.experience', id: 'experiencia' },
  { labelKey: 'nav.projects', id: 'electios' },
  { labelKey: 'nav.contact', id: 'contact' },
];

const LangDropdown: React.FC = () => {
  const { locale, setLocale } = useLanguage();
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
    <LangWrapper ref={wrapperRef}>
      <LangButton
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Select language"
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronDown size={12} style={{ opacity: 0.6 }} />
        </motion.span>
      </LangButton>

      <AnimatePresence>
        {open && (
          <LangMenu
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {localeOptions.map(opt => (
              <LangOption
                key={opt.key}
                $active={opt.key === locale}
                onClick={() => { setLocale(opt.key); setOpen(false); }}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </LangOption>
            ))}
          </LangMenu>
        )}
      </AnimatePresence>
    </LangWrapper>
  );
};

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <Nav aria-label="Main navigation">
          <Logo onClick={() => scrollToSection('home')} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} aria-label="Go to top">
            <strong>Luys Fernnando</strong>
            <span>Full Stack</span>
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.id} onClick={() => scrollToSection(item.id)} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                {t(item.labelKey)}
              </NavLink>
            ))}
          </NavLinks>

          <Actions>
            <SocialLinks aria-label="Social links">
              <SocialLink href="https://github.com/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="GitHub">
                <FaGithub size={18} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </SocialLink>
            </SocialLinks>

            <IconButton onClick={toggleTheme} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            <DesktopOnly>
              <LangDropdown />
            </DesktopOnly>

            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{ scale: 0.95 }} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </MobileMenuButton>
          </Actions>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            {navItems.map((item, index) => (
              <MobileNavLink key={item.id} onClick={() => scrollToSection(item.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
                {t(item.labelKey)}
              </MobileNavLink>
            ))}
            <LangDropdown />

            <MobileSocialLinks aria-label="Social links">
              <SocialLink href="https://github.com/luysfernnando" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={22} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/luysfernnando" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={22} />
              </SocialLink>
            </MobileSocialLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};
