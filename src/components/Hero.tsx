import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import { Container, Button } from '../styles/GlobalStyle';
import { GitHubUser } from '../types';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  overflow: hidden;
`;

const HeroContent = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const Greeting = styled(motion.p)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const FloatingShape = styled(motion.div)<{ top: string; left: string; size: string }>`
  position: absolute;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}33,
    ${({ theme }) => theme.colors.accent}33
  );
  border-radius: 50%;
  filter: blur(1px);
  z-index: 1;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const Stats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

interface HeroProps {
  user?: GitHubUser | null;
  stats?: {
    totalRepositories: number;
    totalStars: number;
    totalForks: number;
  };
}

export const Hero: React.FC<HeroProps> = ({ user, stats }) => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <HeroSection id="home">
      <FloatingShape top="10%" left="10%" size="80px" />
      <FloatingShape top="20%" left="80%" size="120px" />
      <FloatingShape top="60%" left="5%" size="60px" />
      <FloatingShape top="70%" left="85%" size="100px" />

      <HeroContent>
        <TextContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Greeting variants={itemVariants}>
              Olá, eu sou
            </Greeting>

            <Name variants={itemVariants}>
              {user?.name || 'Desenvolvedor Full Stack'}
            </Name>

            <Title variants={itemVariants}>
              Desenvolvedor Full Stack
            </Title>

            <Description variants={itemVariants}>
              {user?.bio || `Desenvolvedor Full Stack com mais de 6 anos de experiência,
              especializado em criar soluções web modernas e escaláveis.
              Baseado em Goiânia-GO, apaixonado por tecnologia e inovação.`}
            </Description>

            <ActionButtons variants={itemVariants}>
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
              >
                Ver Projetos
                <ExternalLink size={20} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                as="a"
                href="/curriculum.pdf"
                download
              >
                Download CV
                <Download size={20} />
              </Button>
            </ActionButtons>

            {stats && (
              <Stats variants={itemVariants}>
                <StatItem>
                  <StatNumber>{stats.totalRepositories}</StatNumber>
                  <StatLabel>Repositórios</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>{stats.totalStars}</StatNumber>
                  <StatLabel>Stars</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>{stats.totalForks}</StatNumber>
                  <StatLabel>Forks</StatLabel>
                </StatItem>
              </Stats>
            )}
          </motion.div>
        </TextContent>

        <ImageContainer>
          <ProfileImage
            src={user?.avatar_url || '/api/placeholder/300/300'}
            alt="Foto do perfil"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5
            }}
            whileHover={{ scale: 1.05 }}
          />
        </ImageContainer>
      </HeroContent>

      <ScrollIndicator
        onClick={scrollToProjects}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span style={{ fontSize: '0.875rem' }}>Role para baixo</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </ScrollIndicator>
    </HeroSection>
  );
};
