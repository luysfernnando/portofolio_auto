"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, ExternalLink, Mail, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Container, Section, SectionTitle } from '../../styles/GlobalStyle';

/* ——— Styled Components ——— */

const GlassCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.colors.surface}99`};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => `${theme.colors.border}50`};
  border-radius: 1.5rem;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at top left, ${({ theme }) => theme.colors.primary}18 0%, transparent 60%);
    pointer-events: none;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TagLine = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin: 0;
  max-width: 30ch;
`;

const Headline = styled.h3`
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;

  span {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-radius: 0.85rem;
  background: ${({ theme }) => `${theme.colors.background}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}50`};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.25s ease;
  cursor: pointer;

  svg:first-child {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }

  span {
    flex: 1;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .arrow {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0;
    transform: translateX(-6px);
    transition: all 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => `${theme.colors.primary}60`};
    background: ${({ theme }) => `${theme.colors.surface}CC`};
    transform: translateX(4px);

    span { color: ${({ theme }) => theme.colors.text}; }
    .arrow { opacity: 1; transform: translateX(0); }
  }
`;

const LocationBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
  padding: 0.4rem 0.75rem;
  background: ${({ theme }) => `${theme.colors.background}60`};
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  width: fit-content;

  svg { color: ${({ theme }) => theme.colors.primary}; }
`;

/* Form */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const FloatLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const inputBase = `
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.25s ease;
  width: 100%;
  box-sizing: border-box;
`;

const Input = styled.input`
  ${inputBase}
  background: ${({ theme }) => `${theme.colors.background}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}60`};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder { color: ${({ theme }) => theme.colors.textSecondary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.surface}CC`};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const TextArea = styled.textarea`
  ${inputBase}
  background: ${({ theme }) => `${theme.colors.background}80`};
  border: 1px solid ${({ theme }) => `${theme.colors.border}60`};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 130px;

  &::placeholder { color: ${({ theme }) => theme.colors.textSecondary}; }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.surface}CC`};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const ErrorText = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.error};
`;

const SendButton = styled(motion.button) <{ $success?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  align-self: flex-end;
  min-width: 180px;

  background: ${({ $success, theme }) =>
    $success ? theme.colors.success : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  color: white;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    box-shadow: 0 6px 20px ${({ theme }) => `${theme.colors.primary}50`};
  }
`;

const FeedbackBar = styled(motion.div) <{ $type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;

  background: ${({ $type, theme }) =>
    $type === 'success' ? `${theme.colors.success}22` : `${theme.colors.error}22`};
  color: ${({ $type, theme }) =>
    $type === 'success' ? theme.colors.success : theme.colors.error};
  border: 1px solid ${({ $type, theme }) =>
    $type === 'success' ? `${theme.colors.success}40` : `${theme.colors.error}40`};
`;

/* ——— Component ——— */

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Campo obrigatório';
    if (!formData.email.trim()) e.email = 'Campo obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'E-mail inválido';
    if (!formData.subject.trim()) e.subject = 'Campo obrigatório';
    if (!formData.message.trim()) e.message = 'Campo obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro ao enviar mensagem.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const, staggerChildren: 0.1 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section id="contact" ref={ref}>
      <Container>
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <SectionTitle variants={childVariants}>Contato</SectionTitle>

          <ContactGrid>
            {/* Info Side */}
            <GlassCard variants={childVariants}>
              <InfoSection>
                <Headline>
                  Tem um sistema <span>critico</span> para evoluir?
                </Headline>
                <TagLine>
                  Aberto a conversas sobre produtos digitais, sustentacao de sistemas e projetos que pedem responsabilidade tecnica.
                </TagLine>

                <ContactLinks>
                  <ContactLink
                    href="mailto:contato@luysfernnando.dev"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Mail size={18} />
                    <span>contato@luysfernnando.dev</span>
                    <ExternalLink size={14} className="arrow" />
                  </ContactLink>

                  <ContactLink
                    href="https://linkedin.com/in/luysfernnando"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <FaLinkedin size={18} />
                    <span>linkedin.com/in/luysfernnando</span>
                    <ExternalLink size={14} className="arrow" />
                  </ContactLink>

                  <ContactLink
                    href="https://github.com/luysfernnando"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <FaGithub size={18} />
                    <span>github.com/luysfernnando</span>
                    <ExternalLink size={14} className="arrow" />
                  </ContactLink>
                </ContactLinks>

                <LocationBadge>
                  <MapPin size={13} />
                  Goiânia, Brasil
                </LocationBadge>
              </InfoSection>
            </GlassCard>

            {/* Form Side */}
            <GlassCard variants={childVariants}>
              <Form onSubmit={handleSubmit} noValidate>
                <FormRow>
                  <FieldGroup>
                    <FloatLabel htmlFor="name">Nome</FloatLabel>
                    <Input
                      id="name" name="name" type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                  </FieldGroup>

                  <FieldGroup>
                    <FloatLabel htmlFor="email">E-mail</FloatLabel>
                    <Input
                      id="email" name="email" type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                  </FieldGroup>
                </FormRow>

                <FieldGroup>
                  <FloatLabel htmlFor="subject">Assunto</FloatLabel>
                  <Input
                    id="subject" name="subject" type="text"
                    placeholder="Sobre o que você quer falar?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <ErrorText>{errors.subject}</ErrorText>}
                </FieldGroup>

                <FieldGroup>
                  <FloatLabel htmlFor="message">Mensagem</FloatLabel>
                  <TextArea
                    id="message" name="message"
                    placeholder="Descreva seu projeto, ideia ou oportunidade..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </FieldGroup>

                <AnimatePresence>
                  {success && (
                    <FeedbackBar
                      $type="success"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <CheckCircle size={18} />
                      Mensagem enviada! Retornarei em breve.
                    </FeedbackBar>
                  )}
                  {apiError && (
                    <FeedbackBar
                      $type="error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <AlertCircle size={18} />
                      {apiError}
                    </FeedbackBar>
                  )}
                </AnimatePresence>

                <SendButton
                  type="submit"
                  $success={success}
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    'Enviando...'
                  ) : success ? (
                    <><CheckCircle size={18} /> Enviado!</>
                  ) : (
                    <><Send size={18} /> Enviar Mensagem</>
                  )}
                </SendButton>
              </Form>
            </GlassCard>
          </ContactGrid>
        </motion.div>
      </Container>
    </Section>
  );
};
