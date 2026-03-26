"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Filter, GitFork, Star } from 'lucide-react';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Badge, Button, Card, Container, Section, SectionTitle } from '../../styles/GlobalStyle';
import { Project } from '../../types';

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const FilterButton = styled(Button)<{ $active: boolean }>`
  ${({ $active, theme }) => $active && `
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
  
  /* Glassmorphism & Iluminação */
  background: ${({ theme }) => `${theme.colors.surface}B3`}; /* 70% opacity */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
  padding: 1.25rem; /* Diminuindo de 1.5rem pra 1.25rem */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, ${({ theme }) => theme.colors.primary}1A 0%, transparent 60%),
                radial-gradient(circle at bottom right, ${({ theme }) => theme.colors.accent}15 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.5s ease;
    opacity: 0.6;
  }

  &:hover {
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid ${({ theme }) => `${theme.colors.primary}66`};
    
    &::before {
      opacity: 1;
    }
  }

  /* Garante que o conteúdo fique acima do fundo luminoso */
  > * {
    z-index: 1;
    position: relative;
  }
`;

const ProjectImage = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  height: 200px;
  background: ${({ $hasImage, theme }) =>
    $hasImage
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

const ProjectItem: React.FC<{ project: Project; itemVariants: any; index: number }> = ({ project, itemVariants, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fecha format date local ou move pra util
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: index * 0.1 }}
      layout
    >
      <ProjectCard
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        {project.featured && (
          <FeaturedBadge>Destaque</FeaturedBadge>
        )}

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

          {/* Swap Area */}
          <div style={{ position: 'relative', flex: 1, minHeight: '220px', overflow: 'hidden', width: '100%' }}>
            
            {/* Image */}
            <AnimatePresence initial={false}>
              {!isExpanded && (
                <motion.div
                  key="image"
                  initial={{ y: -220, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -220, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <ProjectImage $hasImage={!!project.imageUrl} style={{ height: '200px', marginBottom: 0 }}>
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
                        <FaGithub />
                      </div>
                    )}
                  </ProjectImage>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Details */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="details"
                  initial={{ y: 220, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 220, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
                >
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
                      $variant="outline"
                      $size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={16} />
                      Código
                    </Button>

                    {project.liveUrl && (
                      <Button
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        $variant="primary"
                        $size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        Demo
                      </Button>
                    )}
                  </ProjectActions>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </ProjectContent>
      </ProjectCard>
    </motion.div>
  );
};


interface ProjectsProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  loading,
  error,
}) => {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<'all' | 'featured' | 'recent'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                    $active={filter === option.key}
                    onClick={() => {
                      setFilter(option.key as any);
                      setCurrentPage(1);
                    }}
                    $variant="outline"
                    $size="sm"
                  >
                    {option.key === 'featured' ? <Star size={16} /> : <Filter size={16} />}
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
              <>
                <ProjectsGrid>
                  <AnimatePresence>
                    {paginatedProjects.map((project, index) => (
                    <ProjectItem 
                      key={project.id} 
                      project={project} 
                      itemVariants={itemVariants} 
                      index={index} 
                    />
                  ))}
                </AnimatePresence>
              </ProjectsGrid>

              {totalPages > 1 && (
                <PaginationContainer>
                  <Button 
                    $variant="outline" 
                    $size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <PageInfo>
                    Página {currentPage} de {totalPages}
                  </PageInfo>
                  <Button 
                    $variant="outline" 
                    $size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </Button>
                </PaginationContainer>
              )}
            </>
            )}
          </ProjectsContainer>
        </motion.div>
      </Container>
    </Section>
  );
};
