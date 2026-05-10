"use client";
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bell, Brain, Cloud, ExternalLink, Vote } from 'lucide-react';
import { Container, Section, SectionTitle, Badge, Button } from '../../styles/components';

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const capabilities: Capability[] = [
  {
    title: 'Votacao em tempo real',
    description: 'Acompanhamento de votos, filas e eventos de pleito com foco em confiabilidade operacional.',
    icon: <Vote size={22} />,
  },
  {
    title: 'Comunicacao multicanal',
    description: 'Notificacoes por email, SMS e WhatsApp para orientar eleitores e equipes durante a jornada.',
    icon: <Bell size={22} />,
  },
  {
    title: 'Operacoes com IA',
    description: 'Comandos em linguagem natural para apoiar rotinas administrativas e reduzir friccao operacional.',
    icon: <Brain size={22} />,
  },
  {
    title: 'Infraestrutura resiliente',
    description: 'Oracle Cloud, PostgreSQL e Cloudflare compondo uma base segura para eventos sensiveis.',
    icon: <Cloud size={22} />,
  },
];

const ProjectsIntro = styled.div`
  margin-bottom: 2rem;
`;

const CaseStudy = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2rem;
  background:
    radial-gradient(circle at top right, ${({ theme }) => theme.colors.accent}22, transparent 24rem),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 2rem 5rem ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

const CaseHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: clamp(2.4rem, 6vw, 5.8rem);
  margin-bottom: 1rem;
`;

const ProjectLead = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.15rem;
  line-height: 1.75;
  margin: 0;
`;

const MetricPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.border};
  border-radius: 1.25rem;
  overflow: hidden;
`;

const Metric = styled.div`
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.background};

  strong {
    display: block;
    font-family: 'Newsreader', Georgia, serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.45rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
  }
`;

const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const CapabilityCard = styled(motion.div)`
  padding: 1.5rem;
  min-height: 16rem;
  background: ${({ theme }) => theme.colors.surface};

  svg {
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 1rem;
  }

  h4 {
    font-family: 'IBM Plex Sans', 'Aptos', sans-serif;
    letter-spacing: 0;
    font-size: 1.05rem;
    margin-bottom: 0.75rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }
`;

const StackBand = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding: 1.5rem 2rem 2rem;
`;

const CaseActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

export const Projects: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.58, ease: 'easeOut' as const },
    },
  };

  return (
    <Section id="electios" ref={ref} aria-labelledby="electios-title">
      <Container>
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <ProjectsIntro>
            <SectionTitle id="electios-title" variants={itemVariants}>
              Projeto principal
            </SectionTitle>
          </ProjectsIntro>

          <CaseStudy variants={itemVariants}>
            <CaseHeader>
              <div>
                <Label>Case study · cofundador e desenvolvedor</Label>
                <ProjectTitle>Electios</ProjectTitle>
                <ProjectLead>
                  Plataforma de eleicoes online utilizada por OAB GO, OAB MT, OAB RJ e outras instituicoes. O produto combina experiencia eleitoral, auditoria operacional, comunicacao em massa e automacoes inteligentes para pleitos com mais de 50 mil eleitores.
                </ProjectLead>
                <CaseActions>
                  <Button as="a" href="https://electios.com.br" target="_blank" rel="noopener noreferrer" $variant="primary" $size="sm" aria-label="Abrir site do Electios">
                    Conhecer Electios
                    <ExternalLink size={16} />
                  </Button>
                  <Button as="a" href="#contact" $variant="outline" $size="sm">
                    Conversar sobre projetos criticos
                  </Button>
                </CaseActions>
              </div>
              <MetricPanel aria-label="Indicadores do Electios">
                <Metric>
                  <strong>50k+</strong>
                  <span>eleitores em pleitos operados</span>
                </Metric>
                <Metric>
                  <strong>OAB</strong>
                  <span>GO, MT, RJ e outras seccionais</span>
                </Metric>
                <Metric>
                  <strong>IA</strong>
                  <span>operacoes em linguagem natural</span>
                </Metric>
                <Metric>
                  <strong>24/7</strong>
                  <span>foco em disponibilidade e resposta</span>
                </Metric>
              </MetricPanel>
            </CaseHeader>

            <CapabilityGrid>
              {capabilities.map((capability) => (
                <CapabilityCard key={capability.title} variants={itemVariants}>
                  {capability.icon}
                  <h4>{capability.title}</h4>
                  <p>{capability.description}</p>
                </CapabilityCard>
              ))}
            </CapabilityGrid>

            <StackBand aria-label="Stack tecnico do Electios">
              {['Elixir', 'Phoenix', 'LiveView', 'Ash', 'PostgreSQL', 'Oracle Cloud', 'Cloudflare', 'Email', 'SMS', 'WhatsApp'].map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </StackBand>
          </CaseStudy>
        </motion.div>
      </Container>
    </Section>
  );
};
