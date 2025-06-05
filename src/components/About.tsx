import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, Code, Coffee } from 'lucide-react';
import { Container, Section, SectionTitle, Card, Badge } from '../styles/GlobalStyle';

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const PersonalInfo = styled(Card)`
  padding: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SkillsSection = styled.div``;

const SkillCategory = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillBadge = styled(Badge)<{ level: number }>`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ level }) => level}%;
    background: ${({ theme }) => theme.colors.primary}22;
    border-radius: inherit;
    transition: width 0.5s ease;
  }
`;

const ExperienceSection = styled.div`
  margin-top: 3rem;
`;

const ExperienceItem = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const Company = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const Period = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  white-space: nowrap;
`;

const JobDescription = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Next.js', level: 85 },
    { name: 'Vue.js', level: 75 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Sass/SCSS', level: 85 },
    { name: 'Styled Components', level: 90 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Express', level: 85 },
    { name: 'NestJS', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Django', level: 70 },
    { name: 'PHP', level: 80 },
    { name: 'Laravel', level: 75 },
  ],
  database: [
    { name: 'PostgreSQL', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'MySQL', level: 85 },
    { name: 'Redis', level: 70 },
    { name: 'Firebase', level: 75 },
  ],
  devops: [
    { name: 'Docker', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'GitHub Actions', level: 85 },
    { name: 'Vercel', level: 90 },
    { name: 'Nginx', level: 70 },
  ],
};

const experiences = [
  {
    id: '1',
    title: 'Desenvolvedor Full Stack Pleno',
    company: 'Empresa Tech',
    location: 'Goiânia, GO',
    startDate: '2022-01',
    endDate: null,
    description: [
      'Desenvolvimento de aplicações web modernas utilizando React e Node.js',
      'Implementação de arquiteturas escaláveis e manutenção de sistemas legacy',
      'Colaboração em equipes ágeis e mentoria de desenvolvedores juniores',
      'Otimização de performance e implementação de melhores práticas de segurança',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: '2',
    title: 'Desenvolvedor Full Stack',
    company: 'Startup Inovadora',
    location: 'Goiânia, GO',
    startDate: '2020-03',
    endDate: '2021-12',
    description: [
      'Desenvolvimento de MVP para plataforma de e-commerce',
      'Criação de APIs RESTful e integração com sistemas de pagamento',
      'Implementação de testes automatizados e deploy contínuo',
      'Trabalho direto com stakeholders para definição de requisitos',
    ],
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe API', 'Digital Ocean'],
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
};

export const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <Section id="about" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Sobre Mim
          </SectionTitle>

          <AboutContent>
            <motion.div variants={itemVariants}>
              <PersonalInfo>
                <InfoItem>
                  <MapPin size={20} />
                  <InfoLabel>Localização:</InfoLabel>
                  <InfoValue>Goiânia, GO</InfoValue>
                </InfoItem>

                <InfoItem>
                  <Calendar size={20} />
                  <InfoLabel>Experiência:</InfoLabel>
                  <InfoValue>6+ anos</InfoValue>
                </InfoItem>

                <InfoItem>
                  <Code size={20} />
                  <InfoLabel>Especialidade:</InfoLabel>
                  <InfoValue>Full Stack Development</InfoValue>
                </InfoItem>

                <InfoItem>
                  <Coffee size={20} />
                  <InfoLabel>Status:</InfoLabel>
                  <InfoValue>Disponível para projetos</InfoValue>
                </InfoItem>
              </PersonalInfo>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SkillsSection>
                {Object.entries(skills).map(([category, skillList]) => (
                  <SkillCategory key={category}>
                    <CategoryTitle>
                      {category === 'frontend' && 'Frontend'}
                      {category === 'backend' && 'Backend'}
                      {category === 'database' && 'Banco de Dados'}
                      {category === 'devops' && 'DevOps'}
                    </CategoryTitle>
                    <SkillsGrid>
                      {skillList.map((skill) => (
                        <SkillBadge key={skill.name} level={skill.level}>
                          {skill.name}
                        </SkillBadge>
                      ))}
                    </SkillsGrid>
                  </SkillCategory>
                ))}
              </SkillsSection>
            </motion.div>
          </AboutContent>

          <ExperienceSection>
            <motion.h2
              variants={itemVariants}
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                marginBottom: '2rem',
                textAlign: 'center',
              }}
            >
              Experiência Profissional
            </motion.h2>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <ExperienceItem>
                  <ExperienceHeader>
                    <div>
                      <JobTitle>{exp.title}</JobTitle>
                      <Company>{exp.company} • {exp.location}</Company>
                    </div>
                    <Period>
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                    </Period>
                  </ExperienceHeader>

                  <JobDescription>
                    <ul>
                      {exp.description.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '0.5rem' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </JobDescription>

                  <TechStack>
                    {exp.technologies.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </TechStack>
                </ExperienceItem>
              </motion.div>
            ))}
          </ExperienceSection>
        </motion.div>
      </Container>
    </Section>
  );
};
