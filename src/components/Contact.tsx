import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react';
import { Container, Section, SectionTitle, Card, Button } from '../styles/GlobalStyle';

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(Card)`
  padding: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    min-width: 24px;
  }
`;

const ContactDetails = styled.div``;

const ContactLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ContactForm = styled(Card)`
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(Button)<{ loading?: boolean; success?: boolean }>`
  align-self: flex-start;

  ${({ loading, theme }) => loading && `
    opacity: 0.7;
    cursor: not-allowed;
  `}

  ${({ success, theme }) => success && `
    background: ${theme.colors.success};
    color: white;
  `}
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: 500;
  margin-top: 1rem;
`;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simular envio de email
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors({ message: 'Erro ao enviar mensagem. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <Section id="contact" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Entre em Contato
          </SectionTitle>

          <ContactContainer>
            <motion.div variants={itemVariants}>
              <ContactInfo>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}>
                  Vamos conversar!
                </h3>

                <p style={{
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)'
                }}>
                  Estou sempre aberto a novas oportunidades e projetos interessantes.
                  Entre em contato comigo através dos canais abaixo ou envie uma mensagem
                  diretamente pelo formulário.
                </p>

                <ContactItem>
                  <Mail />
                  <ContactDetails>
                    <ContactLabel>Email</ContactLabel>
                    <ContactValue>
                      <ContactLink href="mailto:contato@lulfex.dev">
                        contato@lulfex.dev
                      </ContactLink>
                    </ContactValue>
                  </ContactDetails>
                </ContactItem>

                <ContactItem>
                  <Phone />
                  <ContactDetails>
                    <ContactLabel>Telefone</ContactLabel>
                    <ContactValue>
                      <ContactLink href="tel:+5562999999999">
                        +55 (62) 99999-9999
                      </ContactLink>
                    </ContactValue>
                  </ContactDetails>
                </ContactItem>

                <ContactItem>
                  <MapPin />
                  <ContactDetails>
                    <ContactLabel>Localização</ContactLabel>
                    <ContactValue>Goiânia, Goiás - Brasil</ContactValue>
                  </ContactDetails>
                </ContactItem>

                <SocialLinks>
                  <SocialLink
                    href="https://github.com/lulfex"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={24} />
                  </SocialLink>

                  <SocialLink
                    href="https://linkedin.com/in/lulfex"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={24} />
                  </SocialLink>
                </SocialLinks>
              </ContactInfo>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ContactForm>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}>
                  Envie uma mensagem
                </h3>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Assunto da mensagem"
                      required
                    />
                    {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="message">Mensagem *</Label>
                    <TextArea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descreva seu projeto ou ideia..."
                      required
                    />
                    {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                  </FormGroup>

                  <SubmitButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    success={success}
                    disabled={loading}
                  >
                    {loading ? (
                      'Enviando...'
                    ) : success ? (
                      <>
                        <CheckCircle size={20} />
                        Enviado!
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar Mensagem
                      </>
                    )}
                  </SubmitButton>

                  {success && (
                    <SuccessMessage>
                      <CheckCircle size={20} />
                      Mensagem enviada com sucesso! Retornarei em breve.
                    </SuccessMessage>
                  )}
                </Form>
              </ContactForm>
            </motion.div>
          </ContactContainer>
        </motion.div>
      </Container>
    </Section>
  );
};
