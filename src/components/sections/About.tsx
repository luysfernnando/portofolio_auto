"use client";
import { motion } from 'framer-motion';
import { Calendar, Code2, MapPin, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Container, Section, SectionTitle, Badge } from '../../styles/GlobalStyle';

interface ExperienceItemData {
  title: string;
  company: string;
  period: string;
  metrics: string[];
  description: string[];
  technologies: string[];
}

const stackGroups = [
  {
    title: 'Produto e frontend',
    items: ['React', 'Next.js', 'LiveView', 'TypeScript', 'Styled Components', 'Acessibilidade'],
  },
  {
    title: 'Backend e dados',
    items: ['Elixir', 'Phoenix', 'Ash', 'Node.js', 'PostgreSQL', 'APIs integradas'],
  },
  {
    title: 'Operacao e IA',
    items: ['Oracle Cloud', 'Cloudflare', 'Docker', 'RAG/LLM', 'Active Directory', 'SEI'],
  },
];

const experiences: ExperienceItemData[] = [
  {
    title: 'Desenvolvedor Full Stack',
    company: 'ILHA SERVICE - TRE-GO',
    period: 'Mai 2025 - Atual',
    metrics: ['100+ sistemas', 'escala institucional', 'incidentes criticos'],
    description: [
      'Sustenta e evolui mais de 100 sistemas para cartorios, magistrados e servidores, protegendo continuidade operacional em ambiente publico critico.',
      'Realiza tuning de queries, correcao de N+1, estrategias de cache e ajustes de infraestrutura para melhorar performance de sistemas legados e atuais.',
      'Integra fluxos com Active Directory, WordPress e SEI, conectando autenticacao, conteudo institucional e processos administrativos.',
      'Diagnostica incidentes criticos no GLPI com leitura de logs, queries, deadlocks e comportamento de aplicacoes em producao.',
      'Apoia rotinas com RAG/LLM, suporte tecnico e automacao documental para reduzir tempo de atendimento e aumentar produtividade.',
      'Toma decisoes tecnicas autonomas considerando escala, seguranca e impacto institucional.',
    ],
    technologies: ['Java', 'PostgreSQL', 'Active Directory', 'WordPress', 'SEI', 'RAG/LLM', 'GLPI'],
  },
  {
    title: 'Desenvolvedor Full Stack',
    company: 'Kernel Lab Solucoes Digitais',
    period: 'Fev 2024 - Jan 2025',
    metrics: ['full stack', 'testes automatizados', 'code review'],
    description: [
      'Construiu modulos em Laravel, React e Vue para produtos digitais com foco em manutencao, legibilidade e entrega continua.',
      'Otimizou queries e pontos de performance para reduzir gargalos em telas, APIs e rotinas de dados.',
      'Implementou testes automatizados com PHPUnit e Jest, elevando confianca de entrega e regressao.',
      'Manteve ambientes Docker consistentes para desenvolvimento, homologacao e apoio a novos integrantes.',
      'Contribuiu com code review, suporte tecnico ao time e padronizacao de decisoes de implementacao.',
    ],
    technologies: ['Laravel', 'React', 'Vue', 'PHPUnit', 'Jest', 'Docker'],
  },
  {
    title: 'Desenvolvedor Full Stack',
    company: 'Tradio Bank',
    period: 'Fev 2023 - Fev 2024',
    metrics: ['banking', 'integracoes fiscais', 'AWS ECS'],
    description: [
      'Entregou funcionalidades bancarias criticas em Laravel e React, equilibrando produto, confiabilidade e requisitos operacionais.',
      'Implementou fluxos de autenticacao e integracoes com SEFAZ para operacoes sensiveis e dependentes de conformidade.',
      'Aplicou lazy loading e melhorias de carregamento para reduzir custo de renderizacao em interfaces de alta responsabilidade.',
      'Participou de deploys em AWS ECS, aproximando desenvolvimento, infraestrutura e observabilidade de producao.',
    ],
    technologies: ['Laravel', 'React', 'SEFAZ', 'Lazy loading', 'AWS ECS'],
  },
  {
    title: 'Desenvolvedor Full Stack',
    company: 'SEDS - Governo de Goias',
    period: 'Mar 2019 - Fev 2023',
    metrics: ['milhares de usuarios', '10+ portais', 'junior a pleno'],
    description: [
      'Desenvolveu o Passaporte do Idoso para milhares de usuarios, ampliando acesso a servicos publicos digitais.',
      'Automatizou rotinas e manutencao em mais de 10 portais institucionais do Governo de Goias.',
      'Criou APIs REST para conectar servicos, paineis administrativos e fluxos de informacao publica.',
      'Entregou interfaces responsivas para alto volume de acessos e diferentes perfis de usuarios.',
      'Evoluiu de junior para pleno ao assumir maior autonomia tecnica, leitura de negocio e responsabilidade por entregas.',
    ],
    technologies: ['APIs REST', 'Portais institucionais', 'Interfaces responsivas', 'Servicos publicos'],
  },
];

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 3rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.75rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1.5rem 3rem ${({ theme }) => theme.colors.shadow};
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.12rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.accent};
    flex-shrink: 0;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const StackPanel = styled(motion.div)`
  display: grid;
  gap: 1rem;
`;

const StackGroup = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.25rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.surface};

  h3 {
    font-family: 'IBM Plex Sans', 'Aptos', sans-serif;
    font-size: 1rem;
    letter-spacing: 0;
    margin-bottom: 1rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ExperienceSection = styled.div`
  margin-top: 5rem;
`;

const ExperienceHeader = styled.div`
  margin-bottom: 2rem;
`;

const ExperienceTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 4rem);
  margin-bottom: 0;
`;

const TimelineStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineStat = styled.div`
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.colors.surface};

  strong {
    display: block;
    font-family: 'Newsreader', Georgia, serif;
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.35rem;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  display: grid;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: calc(10rem + 0.95rem);
    width: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 760px) {
    &::before {
      left: 1.1rem;
    }
  }
`;

const ExperienceCard = styled(motion.article)`
  position: relative;
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  gap: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, ${({ theme }) => theme.colors.accent}12, transparent 18rem),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1.25rem 2.5rem ${({ theme }) => theme.colors.shadow};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 1.65rem;
    left: calc(10rem + 0.62rem);
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
    border: 0.35rem solid ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border};
    z-index: 2;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 0;

    &::before {
      top: 1.5rem;
      left: 0.78rem;
    }
  }
`;

const DateRail = styled.div`
  padding: 1.5rem 1.25rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 760px) {
    padding: 1.25rem 1.25rem 0 3rem;
    border-right: 0;
    background: transparent;
  }
`;

const Period = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const SeniorityMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;

  span {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.3rem 0.65rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
`;

const TimelineContent = styled.div`
  padding: 1.5rem 1.5rem 1.5rem 0;

  @media (max-width: 760px) {
    padding: 0.75rem 1.25rem 1.35rem 3rem;
  }
`;

const Company = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  margin-bottom: 0.5rem;
`;

const JobTitle = styled.h3`
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  margin-bottom: 1rem;
`;

const DescriptionList = styled.ul`
  display: grid;
  gap: 0.65rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
  list-style: none;
  margin-bottom: 1.25rem;

  li {
    position: relative;
    padding-left: 1rem;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export const About: React.FC = () => {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.12 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
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
    <Section id="perfil" ref={ref} aria-labelledby="perfil-title">
      <Container>
        <motion.div variants={containerVariants} initial={false} animate="visible">
          <ProfileGrid>
            <ProfileCard variants={itemVariants}>
              <SectionTitle id="perfil-title" variants={itemVariants}>
                Perfil
              </SectionTitle>
              <Lead>
                Desenvolvedor Full Stack com repertorio em sistemas de missao critica, produtos SaaS e plataformas digitais para o setor publico. O trabalho combina entrega pragmatica, leitura de contexto institucional e cuidado com operacao real.
              </Lead>
              <InfoGrid>
                <InfoItem>
                  <MapPin size={18} />
                  <span><strong>Base:</strong> Goiânia-GO</span>
                </InfoItem>
                <InfoItem>
                  <Calendar size={18} />
                  <span><strong>Experiencia:</strong> 7+ anos</span>
                </InfoItem>
                <InfoItem>
                  <ShieldCheck size={18} />
                  <span><strong>Dominio:</strong> sistemas publicos criticos</span>
                </InfoItem>
                <InfoItem>
                  <Code2 size={18} />
                  <span><strong>Atuacao:</strong> produto, backend, frontend e infraestrutura</span>
                </InfoItem>
              </InfoGrid>
            </ProfileCard>

            <StackPanel id="stack" variants={itemVariants} aria-label="Stack tecnico">
              {stackGroups.map((group) => (
                <StackGroup key={group.title}>
                  <h3>{group.title}</h3>
                  <BadgeRow>
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </BadgeRow>
                </StackGroup>
              ))}
            </StackPanel>
          </ProfileGrid>

          <ExperienceSection id="experiencia" aria-labelledby="experiencia-title">
            <ExperienceHeader>
              <ExperienceTitle id="experiencia-title" variants={itemVariants}>
                Linha do tempo profissional
              </ExperienceTitle>
            </ExperienceHeader>

            <TimelineStats variants={itemVariants} aria-label="Resumo de senioridade">
              <TimelineStat>
                <strong>7+</strong>
                <span>anos em software full stack</span>
              </TimelineStat>
              <TimelineStat>
                <strong>100+</strong>
                <span>sistemas sustentados no TRE-GO</span>
              </TimelineStat>
              <TimelineStat>
                <strong>10+</strong>
                <span>portais publicos automatizados</span>
              </TimelineStat>
            </TimelineStats>

            <Timeline>
              {experiences.map((experience) => (
                <ExperienceCard key={`${experience.company}-${experience.period}`} variants={itemVariants}>
                  <DateRail>
                    <Period>{experience.period}</Period>
                    <SeniorityMetrics>
                      {experience.metrics.map((metric) => (
                        <span key={metric}>{metric}</span>
                      ))}
                    </SeniorityMetrics>
                  </DateRail>
                  <TimelineContent>
                    <Company>{experience.company}</Company>
                    <JobTitle>{experience.title}</JobTitle>
                    <DescriptionList>
                      {experience.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </DescriptionList>
                    <BadgeRow>
                      {experience.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </BadgeRow>
                  </TimelineContent>
                </ExperienceCard>
              ))}
            </Timeline>

          </ExperienceSection>
        </motion.div>
      </Container>
    </Section>
  );
};
