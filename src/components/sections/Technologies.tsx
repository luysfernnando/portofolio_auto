"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { useLanguage } from '../../context/LanguageContext';

const StackBlock = styled(motion.div)`
  padding-bottom: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 860px) {
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
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

  @media (max-width: 860px) {
    text-align: center;
  }
`;

const StackTagline = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 44ch;

  @media (max-width: 860px) {
    text-align: center;
    max-width: 100%;
  }
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

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.58, ease: 'easeOut' as const } },
};

export const Technologies: React.FC = () => {
  const { t, messages } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <StackBlock
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <StackLayout>
        <StackLeft>
          <StackTitle>{t('technologies.title')}</StackTitle>
          <StackTagline>{t('technologies.tagline')}</StackTagline>
        </StackLeft>
        <StackTable>
          {messages.technologies.groups.map((group) => (
            <StackRow key={group.title}>
              <StackCat>{group.title}</StackCat>
              <StackTechList>{group.items.join(' · ')}</StackTechList>
            </StackRow>
          ))}
        </StackTable>
      </StackLayout>
    </StackBlock>
  );
};
