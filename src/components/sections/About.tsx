"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Container, Section } from '../../styles/components';

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
    items: ['React', 'Next.js', 'LiveView/Phoenix', 'TypeScript', 'Acessibilidade'],
  },
  {
    title: 'Backend e dados',
    items: ['PHP', 'Elixir', 'Node.js', 'Golang', 'PostgreSQL', 'APIs Rest/GraphQL'],
  },
  {
    title: 'Operação e IA',
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

/* Stack block */
const StackBlock = styled(motion.div)`
  padding-bottom: 4rem;
  margin-bottom: 5rem;
`;

const StackLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StackLeft = styled.div``;

const StackTitle = styled(motion.h2)`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  font-weight: 650;
  line-height: 1.0;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const StackTagline = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 44ch;
`;

const StackTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const StackRow = styled.div`
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`;

const StackCat = styled.span`
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-top: 0.1rem;
`;

const StackTechList = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

/* Experience section */
const ExperienceSection = styled.div``;

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
  display: grid;
  gap: 1rem;
`;

const ExperienceCard = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, ${({ theme }) => theme.colors.accent}0e, transparent 18rem),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1.25rem 2.5rem ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

const Period = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const TimelineContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  flex-shrink: 0;
`;

const RoleLabel = styled.div`
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Company = styled.h3`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 0;
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

const TechLine = styled.p`
  font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
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
    <Section id="perfil" ref={ref} aria-labelledby="experiencia-title">
      <Container>
        <motion.div variants={containerVariants} initial={false} animate="visible">
          <StackBlock variants={itemVariants}>
            <StackLayout>
              <StackLeft>
                <StackTitle variants={itemVariants}>
                  Tecnologias
                </StackTitle>
                <StackTagline variants={itemVariants}>
                  Algumas das ferramentas e linguagens que mais utilizo nos sistemas críticos, produtos digitais e infraestrutura de onde atuo.
                </StackTagline>
              </StackLeft>
              <StackTable>
                {stackGroups.map((group) => (
                  <StackRow key={group.title}>
                    <StackCat>{group.title}</StackCat>
                    <StackTechList>{group.items.join(' · ')}</StackTechList>
                  </StackRow>
                ))}
              </StackTable>
            </StackLayout>
          </StackBlock>

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
                  <TimelineContent>
                    <CardHeader>
                      <Company>{experience.company}</Company>
                      <CardMeta>
                        <RoleLabel>{experience.title}</RoleLabel>
                        <Period>{experience.period}</Period>
                      </CardMeta>
                    </CardHeader>
                    <DescriptionList>
                      {experience.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </DescriptionList>
                    <TechLine>{experience.technologies.join(' · ')}</TechLine>
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
