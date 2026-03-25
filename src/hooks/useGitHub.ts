"use client";
import { useEffect, useState } from 'react';
import { GitHubUser, Project } from '../types';

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

        const res = await fetch('/api/github');
        if (!res.ok) {
          throw new Error(`Erro na API interna: ${res.status}`);
        }

        const data = await res.json();


        setUser(data.user);
        setProjects(data.projects);
        setStats(data.stats);
      } catch (err) {
        console.error('Erro ao buscar dados do GitHub via API local:', err);
        setError('Erro ao carregar dados do GitHub. Mude o GITHUB_TOKEN no .env.local');
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
        const res = await fetch('/api/github?nocache=' + new Date().getTime());
        if (!res.ok) {
          throw new Error('Falha ao obter dados frescos');
        }
        
        const data = await res.json();
        
        setUser(data.user);
        setProjects(data.projects);
        setStats(data.stats);
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
