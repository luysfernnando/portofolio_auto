"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Container, Section } from '../../styles/components';
import { useLanguage, type Messages } from '../../context/LanguageContext';
import { Technologies } from './Technologies';

const ExperienceSection = styled.div``;

const ExperienceHeader = styled(motion.div)`
  margin-bottom: 2rem;
`;

const ExperienceTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  margin-bottom: 0;

  @media (max-width: 680px) {
    text-align: center;
  }
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

  @media (max-width: 680px) {
    display: flex;
    align-items: center;
    gap: 0;

    strong {
      margin-bottom: 0;
      font-size: clamp(1.5rem, 6vw, 2rem);
      flex-shrink: 0;
      min-width: 5.5rem;
    }
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

  @media (max-width: 520px) {
    align-items: flex-start;
  }
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

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.58, ease: 'easeOut' as const } },
};

type ExpItem = Messages['experiences']['items'][number];

const ExperienceItem: React.FC<{ exp: ExpItem }> = ({ exp }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <ExperienceCard
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <TimelineContent>
        <CardHeader>
          <Company>{exp.company}</Company>
          <CardMeta>
            <RoleLabel>{exp.title}</RoleLabel>
            <Period>{exp.period}</Period>
          </CardMeta>
        </CardHeader>
        <DescriptionList>
          {exp.description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </DescriptionList>
        <TechLine>{exp.technologies.join(' · ')}</TechLine>
      </TimelineContent>
    </ExperienceCard>
  );
};

export const Experiences: React.FC = () => {
  const { t, messages } = useLanguage();
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Section id="perfil" aria-labelledby="experiencia-title">
      <Container>
        <Technologies />

        <ExperienceSection id="experiencia" aria-labelledby="experiencia-title">
          <ExperienceHeader
            ref={headerRef}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
          >
            <ExperienceTitle id="experiencia-title">
              {t('experiences.title')}
            </ExperienceTitle>
          </ExperienceHeader>

          <TimelineStats
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            aria-label="Seniority summary"
          >
            <TimelineStat>
              <strong>7+</strong>
              <span>{t('experiences.stats.years')}</span>
            </TimelineStat>
            <TimelineStat>
              <strong>100+</strong>
              <span>{t('experiences.stats.systems')}</span>
            </TimelineStat>
            <TimelineStat>
              <strong>10+</strong>
              <span>{t('experiences.stats.portals')}</span>
            </TimelineStat>
          </TimelineStats>

          <Timeline>
            {messages.experiences.items.map((exp) => (
              <ExperienceItem key={`${exp.company}-${exp.period}`} exp={exp} />
            ))}
          </Timeline>
        </ExperienceSection>
      </Container>
    </Section>
  );
};
