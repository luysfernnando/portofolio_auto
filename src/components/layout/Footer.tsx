"use client";
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import React from 'react';
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
  padding: 1.25rem 1.5rem;
  max-width: 1180px;
  margin: 0 auto;

  @media (max-width: 520px) {
    padding: 1rem 1.25rem;
  }
`;

const DevDot = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Logo = styled(motion.button)`
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  text-align: left;
  position: relative;
  display: inline-block;

  strong {
    font-family: 'Newsreader', Georgia, serif;
    font-size: 1.35rem;
    letter-spacing: -0.04em;
    line-height: 1;
  }

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

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 520px) {
    strong { font-size: 1.12rem; }
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;

  @media (max-width: 760px) {
    display: none;
  }
`;

const BackToTop = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 650;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  position: relative;
  opacity: 0.7;
  transition: opacity 0.2s ease;

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
    opacity: 1;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Nav>
        <Logo onClick={scrollToTop} whileTap={{ scale: 0.98 }} aria-label="Voltar ao topo">
          <strong>luysfernnando<DevDot>.dev</DevDot></strong>
        </Logo>

        <Copyright>© 2026 Luys Fernnando. Todos os direitos reservados.</Copyright>

        <BackToTop onClick={scrollToTop} aria-label="Voltar ao início">
          Voltar ao Início
          <ArrowUp size={15} />
        </BackToTop>
      </Nav>
    </FooterContainer>
  );
};
