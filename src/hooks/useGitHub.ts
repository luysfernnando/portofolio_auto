import { useState, useEffect } from 'react';
import { GitHubUser, Project } from '../types';
import { GitHubService } from '../services/github';

export const useGitHub = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    totalStars: 0,
    totalForks: 0,
    totalRepositories: 0,
    totalCommits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar dados em paralelo
        const [userInfo, projectsData, statsData] = await Promise.all([
          GitHubService.getUserInfo(),
          GitHubService.getProjects(),
          GitHubService.getGitHubStats(),
        ]);

        console.log('Hook useGitHub - Dados recebidos:');
        console.log('User:', userInfo);
        console.log('Projects:', projectsData.length, 'projetos');
        console.log('Stats:', statsData);

        setUser(userInfo);
        setProjects(projectsData);
        setStats(statsData);
      } catch (err) {
        console.error('Erro ao buscar dados do GitHub:', err);
        setError('Erro ao carregar dados do GitHub. Tentando novamente...');

        // Tentar novamente após 5 segundos
        setTimeout(() => {
          fetchGitHubData();
        }, 5000);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    setError(null);

    // Recarregar dados
    const fetchData = async () => {
      try {
        const [userInfo, projectsData, statsData] = await Promise.all([
          GitHubService.getUserInfo(),
          GitHubService.getProjects(),
          GitHubService.getGitHubStats(),
        ]);

        setUser(userInfo);
        setProjects(projectsData);
        setStats(statsData);
      } catch (err) {
        setError('Erro ao recarregar dados do GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const featuredProjects = projects.filter(project => project.featured).slice(0, 6);
  const recentProjects = projects.slice(0, 8);

  return {
    user,
    projects,
    featuredProjects,
    recentProjects,
    stats,
    loading,
    error,
    refreshData,
  };
};
