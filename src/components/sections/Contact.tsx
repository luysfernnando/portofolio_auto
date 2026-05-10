"use client";
import { motion } from 'framer-motion';
import { ExternalLink, Mail } from 'lucide-react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Container, Section } from '../../styles/components';

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactLeft = styled.div``;

const ContactTitle = styled(motion.h2)`
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  font-weight: 650;
  line-height: 1.0;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
`;

const Tagline = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 44ch;
`;

const ContactList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContactRow = styled(motion.a)`
  display: grid;
  grid-template-columns: 1.5rem 7rem 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  cursor: pointer;

  svg:first-child {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }

  .label {
    font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
    font-size: 0.74rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .value {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.06s;
  }

  .arrow {
    color: ${({ theme }) => theme.colors.border};
    transition: color 0.06s, transform 0.06s;
    flex-shrink: 0;
  }

  &:hover .value {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover .arrow {
    color: ${({ theme }) => theme.colors.primary};
    transform: translate(2px, -2px);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1.5rem 1fr auto;

    .label {
      display: none;
    }
  }
`;

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const, staggerChildren: 0.08 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <Section id="contact" ref={ref} aria-labelledby="contact-title">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <ContactGrid>
            <ContactLeft>
              <ContactTitle id="contact-title" variants={rowVariants}>
                Contato
              </ContactTitle>
              <Tagline variants={rowVariants}>
                Aberto a conversas sobre sistemas criticos, produtos de alta responsabilidade e oportunidades que demandam senioridade tecnica real.
              </Tagline>
            </ContactLeft>

            <ContactList>
              <ContactRow
                href="mailto:contato@luysfernnando.dev"
                variants={rowVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.06, ease: 'easeOut' }}
                aria-label="Enviar email para Luys Fernnando"
              >
                <Mail size={18} />
                <span className="label">Email</span>
                <span className="value">contato@luysfernnando.dev</span>
                <ExternalLink size={14} className="arrow" />
              </ContactRow>

              <ContactRow
                href="https://linkedin.com/in/luysfernnando"
                target="_blank"
                rel="noopener noreferrer"
                variants={rowVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.06, ease: 'easeOut' }}
                aria-label="LinkedIn de Luys Fernnando"
              >
                <FaLinkedin size={18} />
                <span className="label">LinkedIn</span>
                <span className="value">linkedin.com/in/luysfernnando</span>
                <ExternalLink size={14} className="arrow" />
              </ContactRow>

              <ContactRow
                href="https://github.com/luysfernnando"
                target="_blank"
                rel="noopener noreferrer"
                variants={rowVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.06, ease: 'easeOut' }}
                aria-label="GitHub de Luys Fernnando"
              >
                <FaGithub size={18} />
                <span className="label">GitHub</span>
                <span className="value">github.com/luysfernnando</span>
                <ExternalLink size={14} className="arrow" />
              </ContactRow>
            </ContactList>
          </ContactGrid>
        </motion.div>
      </Container>
    </Section>
  );
};
