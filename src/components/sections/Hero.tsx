"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download, MapPin } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { Container, Button } from '../../styles/GlobalStyle';

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0 3rem;

  @media (max-width: 520px) {
    min-height: auto;
    padding: 6.5rem 0 4rem;
  }
`;

const HeroContent = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  gap: 4rem;
  align-items: center;
  z-index: 2;
  min-height: calc(100vh - 80px);
  contain: layout;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 520px) {
    gap: 1.75rem;
    padding-left: 1.35rem;
    padding-right: 1.35rem;
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 7.4rem);
  max-width: 10ch;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 520px) {
    font-size: clamp(2.8rem, 15vw, 3.45rem);
    max-width: 7.4ch;
  }
`;

const Title = styled(motion.h2)`
  font-family: 'IBM Plex Sans', 'Aptos', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-weight: 650;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 42rem;
  overflow-wrap: break-word;

  @media (max-width: 520px) {
    font-size: 1rem;
    line-height: 1.68;
    width: min(100%, 19rem);
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 22rem;

    ${Button} {
      width: 100%;
      min-width: 0;
      white-space: normal;
    }
  }
`;

const LocationLine = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 1.5rem;
  font-size: 0.95rem;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 520px) {
    width: min(100%, 19rem);
  }
`;

const PortraitColumn = styled(motion.div)`
  position: relative;
  min-height: 28rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    min-height: 22rem;
    justify-content: flex-start;
  }

  @media (max-width: 520px) {
    min-height: 16rem;
    justify-content: center;
  }
`;

const PortraitFrame = styled(motion.div)`
  width: min(20rem, 72vw);
  aspect-ratio: 4 / 5;
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    linear-gradient(145deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.mutedSurface}),
    radial-gradient(circle at 70% 15%, ${({ theme }) => theme.colors.accent}30, transparent 42%);
  box-shadow: 0 2rem 5rem ${({ theme }) => theme.colors.shadow};
  position: relative;
  overflow: hidden;

  @media (max-width: 520px) {
    width: min(13rem, 72vw);
    border-radius: 1.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 1.4rem;
  }

  &::after {
    content: 'Retrato em caricatura';
    position: absolute;
    left: 1.25rem;
    right: 1.25rem;
    bottom: 1.25rem;
    padding: 0.7rem 0.85rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.overlay};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }
`;

const PortraitSketch = styled.div`
  position: absolute;
  inset: 3rem 2.5rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    stroke: ${({ theme }) => theme.colors.text};
    fill: none;
    stroke-width: 1.6;
    opacity: 0.72;
  }
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  max-width: 42rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 520px) {
    margin-top: 2rem;
  }
`;

const StatItem = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1rem;
`;

const StatNumber = styled.div`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-top: 0.45rem;
`;

const ScrollIndicator = styled(motion.button)`
  position: absolute;
  bottom: 1.5rem;
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
  const scrollToProfile = () => {
    const element = document.getElementById('perfil');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.65, ease: 'easeOut' as const },
    },
  };

  return (
    <HeroSection id="home" aria-label="Apresentação de Luys Fernnando">
      <HeroContent>
        <motion.div variants={containerVariants} initial={false} animate="visible">
          <Name variants={itemVariants}>Luys Fernnando</Name>
          <Title variants={itemVariants}>
            Desenvolvedor Full Stack em Goiânia-GO
          </Title>
          <Description variants={itemVariants}>
            Luys Fernnando Ribeiro Caetano Brasil atua ha mais de 7 anos em sistemas criticos do setor publico e em produtos digitais de alta responsabilidade, com foco em arquitetura, performance e operacoes em tempo real.
          </Description>
          <ActionButtons variants={itemVariants}>
            <Button $variant="primary" $size="lg" onClick={scrollToProfile}>
              Conhecer meu perfil
              <ArrowRight size={18} />
            </Button>
            <Button $variant="outline" $size="lg" as="a" href="/curriculum.pdf" download>
              Baixar curriculo
              <Download size={18} />
            </Button>
          </ActionButtons>
          <LocationLine variants={itemVariants}>
            <MapPin size={16} /> Goiânia-GO, Brasil
          </LocationLine>
          <Stats variants={itemVariants}>
            <StatItem>
              <StatNumber>7+</StatNumber>
              <StatLabel>anos em sistemas publicos criticos</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100+</StatNumber>
              <StatLabel>sistemas sustentados e evoluidos no TRE-GO</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50k+</StatNumber>
              <StatLabel>eleitores em pleitos operados pelo Electios</StatLabel>
            </StatItem>
          </Stats>
        </motion.div>

        <PortraitColumn initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
          <PortraitFrame whileHover={{ y: -6, rotate: -1 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
            <PortraitSketch aria-hidden="true">
              <svg viewBox="0 0 180 220" role="img">
                <path d="M60 91c-8-19 3-45 29-47 29-2 47 21 39 50" />
                <path d="M55 93c-8 20-3 55 35 58 36 3 50-29 43-58" />
                <path d="M67 82c13-14 38-20 61 0" />
                <path d="M75 103c7-4 16-4 23 0" />
                <path d="M112 103c6-4 14-4 20 0" />
                <path d="M92 116c-4 10-3 16 8 17" />
                <path d="M80 144c16 9 32 8 46-1" />
                <path d="M55 178c17-20 69-20 88 0" />
                <path d="M35 209c8-30 31-45 58-45s52 16 61 45" />
              </svg>
            </PortraitSketch>
          </PortraitFrame>
        </PortraitColumn>
      </HeroContent>

      <ScrollIndicator onClick={scrollToProfile} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} aria-label="Rolar para o perfil">
        Role
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.span>
      </ScrollIndicator>
    </HeroSection>
  );
};
