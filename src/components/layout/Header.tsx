"use client";
import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeaderContainer = styled(motion.header) <{ $scrolled: boolean }>`
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
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  @media (max-width: 520px) {
    strong {
      font-size: 1.12rem;
    }

    span {
      font-size: 0.56rem;
      letter-spacing: 0.11em;
    }
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

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover::after {
    width: 100%;
  }
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

const navItems = [
  { label: 'Inicio', id: 'home' },
  { label: 'Experiencia', id: 'experiencia' },
  { label: 'Projetos', id: 'electios' },
  { label: 'Contato', id: 'contact' },
];

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
        <Nav aria-label="Navegacao principal">
          <Logo onClick={() => scrollToSection('home')} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} aria-label="Ir para o inicio">
            <strong>Luys Fernnando</strong>
            <span>Full Stack</span>
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink key={item.id} onClick={() => scrollToSection(item.id)} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <Actions>
            <SocialLinks aria-label="Links sociais">
              <SocialLink href="https://github.com/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="GitHub de Luys Fernnando">
                <FaGithub size={18} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="LinkedIn de Luys Fernnando">
                <FaLinkedin size={18} />
              </SocialLink>
            </SocialLinks>

            <IconButton onClick={toggleTheme} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{ scale: 0.95 }} aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}>
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
                {item.label}
              </MobileNavLink>
            ))}
            <MobileSocialLinks aria-label="Links sociais no menu mobile">
              <SocialLink href="https://github.com/luysfernnando" target="_blank" rel="noopener noreferrer" aria-label="GitHub de Luys Fernnando">
                <FaGithub size={22} />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/luysfernnando" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Luys Fernnando">
                <FaLinkedin size={22} />
              </SocialLink>
            </MobileSocialLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};
