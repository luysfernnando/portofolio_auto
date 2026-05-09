"use client";
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  backdrop-filter: blur(14px);
  background: ${({ theme }) => theme.colors.overlay};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -1rem 2rem ${({ theme }) => theme.colors.shadow};
`;

const Nav = styled.div`
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
    strong { font-size: 1.12rem; }
    span { font-size: 0.56rem; letter-spacing: 0.11em; }
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;

  @media (max-width: 760px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
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

  @media (max-width: 520px) {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Nav>
        <Logo onClick={scrollToTop} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} aria-label="Voltar ao topo">
          <strong>Luys Fernnando</strong>
          <span>Full Stack</span>
        </Logo>

        <Copyright>© 2026 Luys Fernnando. Todos os direitos reservados.</Copyright>

        <SocialLinks aria-label="Links sociais">
          <SocialLink href="https://github.com/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="GitHub de Luys Fernnando">
            <FaGithub size={18} />
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/luysfernnando" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="LinkedIn de Luys Fernnando">
            <FaLinkedin size={18} />
          </SocialLink>
          <SocialLink href="mailto:contato@luysfernnando.dev" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Enviar email para Luys Fernnando">
            <Mail size={18} />
          </SocialLink>
        </SocialLinks>
      </Nav>
    </FooterContainer>
  );
};
