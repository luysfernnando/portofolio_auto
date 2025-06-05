import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star, GitFork, Filter } from 'lucide-react';
import { Container, Section, SectionTitle, Card, Badge, Button } from '../styles/GlobalStyle';
import { Project } from '../types';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(Button)<{ active: boolean }>`
  ${({ active, theme }) => active && `
    background: ${theme.colors.primary};
    color: white;
  `}
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ProjectImage = styled.div<{ hasImage: boolean }>`
  width: 100%;
  height: 200px;
  background: ${({ hasImage, theme }) =>
    hasImage
      ? 'transparent'
      : `linear-gradient(135deg, ${theme.colors.primary}22, ${theme.colors.accent}22)`
  };
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const ProjectStats = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const FeaturedBadge = styled(Badge)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  z-index: 1;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  loading,
  error,
  onRefresh
}) => {
  console.log('Componente Projects - props recebidas:');
  console.log('projects:', projects.length, 'projetos');
  console.log('loading:', loading);
  console.log('error:', error);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<'all' | 'featured' | 'recent'>('featured');

  const filterOptions = [
    { key: 'all', label: 'Todos os Projetos' },
    { key: 'featured', label: 'Projetos Destacados' },
    { key: 'recent', label: 'Mais Recentes' },
  ];

  const getFilteredProjects = () => {
    switch (filter) {
      case 'featured':
        return projects.filter(project => project.featured);
      case 'recent':
        return projects
          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
          .slice(0, 6);
      default:
        return projects;
    }
  };

  const filteredProjects = getFilteredProjects();

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Section id="projects">
        <Container>
          <SectionTitle>Meus Projetos</SectionTitle>
          <LoadingState>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              Carregando projetos...
            </motion.div>
          </LoadingState>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="projects">
        <Container>
          <SectionTitle>Meus Projetos</SectionTitle>
          <ErrorState>
            <p>{error}</p>
            <Button onClick={onRefresh} variant="primary">
              Tentar Novamente
            </Button>
          </ErrorState>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="projects" ref={ref}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Meus Projetos
          </SectionTitle>

          <ProjectsContainer>
            <motion.div variants={itemVariants}>
              <FilterSection>
                {filterOptions.map((option) => (
                  <FilterButton
                    key={option.key}
                    active={filter === option.key}
                    onClick={() => setFilter(option.key as any)}
                    variant="outline"
                    size="sm"
                  >
                    <Filter size={16} />
                    {option.label}
                  </FilterButton>
                ))}
              </FilterSection>
            </motion.div>

            {filteredProjects.length === 0 ? (
              <EmptyState>
                <p>Nenhum projeto encontrado para o filtro selecionado.</p>
              </EmptyState>
            ) : (
              <ProjectsGrid>
                <AnimatePresence mode="wait">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <ProjectCard>
                        {project.featured && (
                          <FeaturedBadge>Destaque</FeaturedBadge>
                        )}

                        <ProjectImage hasImage={!!project.imageUrl}>
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title} />
                          ) : (
                            <div style={{
                              fontSize: '3rem',
                              opacity: 0.3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                              height: '100%'
                            }}>
                              <Github />
                            </div>
                          )}
                        </ProjectImage>

                        <ProjectContent>
                          <ProjectHeader>
                            <div>
                              <ProjectTitle>{project.title}</ProjectTitle>
                              <ProjectStats>
                                <StatItem>
                                  <Star size={14} />
                                  {project.stars}
                                </StatItem>
                                <StatItem>
                                  <GitFork size={14} />
                                  {project.forks}
                                </StatItem>
                                <StatItem>
                                  Atualizado em {formatDate(project.lastUpdated)}
                                </StatItem>
                              </ProjectStats>
                            </div>
                          </ProjectHeader>

                          <ProjectDescription>
                            {project.description}
                          </ProjectDescription>

                          <TechStack>
                            {project.technologies.slice(0, 5).map((tech) => (
                              <Badge key={tech}>{tech}</Badge>
                            ))}
                            {project.technologies.length > 5 && (
                              <Badge>+{project.technologies.length - 5}</Badge>
                            )}
                          </TechStack>

                          <ProjectActions>
                            <Button
                              as="a"
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outline"
                              size="sm"
                            >
                              <Github size={16} />
                              Código
                            </Button>

                            {project.liveUrl && (
                              <Button
                                as="a"
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="sm"
                              >
                                <ExternalLink size={16} />
                                Demo
                              </Button>
                            )}
                          </ProjectActions>
                        </ProjectContent>
                      </ProjectCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </ProjectsGrid>
            )}
          </ProjectsContainer>
        </motion.div>
      </Container>
    </Section>
  );
};
