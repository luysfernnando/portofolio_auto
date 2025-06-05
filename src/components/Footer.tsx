import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Container } from '../styles/GlobalStyle';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 0 1rem;
  margin-top: 5rem;
`;

const FooterContent = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
`;

const FooterInfo = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const FooterDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const BackToTop = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
  }

  @media (max-width: 768px) {
    order: 3;
    margin: 0 auto;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const MadeWith = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;

  svg {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const TechBadge = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.primary}44;
`;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://github.com/lulfex',
      icon: <Github size={20} />,
      label: 'GitHub',
    },
    {
      href: 'https://linkedin.com/in/lulfex',
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
    },
    {
      href: 'mailto:contato@lulfex.dev',
      icon: <Mail size={20} />,
      label: 'Email',
    },
  ];

  const technologies = [
    'React',
    'TypeScript',
    'Styled Components',
    'Framer Motion',
    'GitHub API',
    'GitHub Pages',
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <FooterInfo>
            <FooterTitle>Lulfex</FooterTitle>
            <FooterDescription>
              Desenvolvedor Full Stack apaixonado por criar soluções digitais
              inovadoras e experiências excepcionais.
            </FooterDescription>
          </FooterInfo>

          <SocialLinks>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={link.label}
              >
                {link.icon}
              </SocialLink>
            ))}
          </SocialLinks>

          <BackToTop
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </BackToTop>
        </FooterMain>

        <TechStack>
          {technologies.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </TechStack>

        <FooterBottom>
          <Copyright>
            © {currentYear} Lulfex. Todos os direitos reservados.
          </Copyright>

          <MadeWith>
            Feito com <Heart size={16} /> e muito café
          </MadeWith>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};
