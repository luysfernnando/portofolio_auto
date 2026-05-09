"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { Button, Container } from '../../styles/GlobalStyle';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 7rem 0 4rem;

  @media (max-width: 520px) {
    min-height: auto;
    padding: 7rem 0 5rem;
  }
`;

const HeroContent = styled(Container)`
  z-index: 2;

  > * {
    min-width: 0;
  }
`;

const RoleLabel = styled(motion.div)`
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.35rem;
`;

const Name = styled(motion.h1)`
  font-size: clamp(3.2rem, 9vw, 8rem);
  max-width: 12ch;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 0.95;

  @media (max-width: 520px) {
    font-size: clamp(3rem, 16vw, 3.6rem);
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.78;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.25rem;
  max-width: 58ch;

  @media (max-width: 520px) {
    font-size: 0.98rem;
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
    max-width: 22rem;

    ${Button} {
      width: 100%;
    }
  }
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2rem;
    column-gap: 2rem;
    padding: 2rem 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    padding: 1.75rem 0;
    border-bottom: none;
  }
`;

const StatItem = styled.div``;

const StatNumber = styled.div`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.6rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.83rem;
  line-height: 1.55;
  max-width: 18ch;
`;

const ScrollIndicator = styled(motion.button)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media (max-width: 520px) {
    display: none;
  }
`;

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <HeroSection id="home" aria-label="Apresentação de Luys Fernnando">
      <HeroContent>
        <motion.div variants={containerVariants} initial={false} animate="visible">
          <RoleLabel variants={itemVariants}>
            Desenvolvedor Full Stack · Goiânia-GO
          </RoleLabel>

          <Name variants={itemVariants}>Luys Fernnando</Name>

          <Description variants={itemVariants}>
            Luys Fernnando Ribeiro Caetano Brasil atua há mais de 7 anos em sistemas críticos do setor público e em produtos digitais de alta responsabilidade, com foco em arquitetura, performance e operações em tempo real.
          </Description>

          <ActionButtons variants={itemVariants}>
            <Button $variant="primary" $size="lg" onClick={() => scrollToSection('experiencia')}>
              Ver experiência
              <ArrowRight size={18} />
            </Button>
            <Button $variant="outline" $size="lg" onClick={() => scrollToSection('contact')}>
              Contato
            </Button>
          </ActionButtons>

          <Stats variants={itemVariants} aria-label="Resumo de carreira">
            <StatItem>
              <StatNumber>7+</StatNumber>
              <StatLabel>anos em sistemas críticos do setor público</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100+</StatNumber>
              <StatLabel>sistemas sustentados e evoluídos no TRE-GO</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>10+</StatNumber>
              <StatLabel>portais públicos automatizados na SEDS</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>4</StatNumber>
              <StatLabel>setores atendidos: público, fintech, social e digital</StatLabel>
            </StatItem>
          </Stats>
        </motion.div>
      </HeroContent>

      <ScrollIndicator
        onClick={() => scrollToSection('experiencia')}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        aria-label="Rolar para experiência"
      >
        Role
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.span>
      </ScrollIndicator>
    </HeroSection>
  );
};
