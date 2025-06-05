import { Octokit } from '@octokit/rest';
import { Repository, GitHubUser, Project } from '../types';

// Configure o token do GitHub aqui (opcional, mas recomendado para evitar rate limits)
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export class GitHubService {
  private static readonly USERNAME = 'luysfernnando'; // Substitua pelo seu username

  /**
   * Busca informações básicas do usuário GitHub
   */
  static async getUserInfo(): Promise<GitHubUser> {
    try {
      const { data } = await octokit.rest.users.getByUsername({
        username: this.USERNAME,
      });
      return data as GitHubUser;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      throw error;
    }
  }

  /**
   * Busca todos os repositórios públicos do usuário
   */
  static async getRepositories(): Promise<Repository[]> {
    try {
      const { data } = await octokit.rest.repos.listForUser({
        username: this.USERNAME,
        type: 'all',
        sort: 'updated',
        per_page: 100,
      });
      return data.filter(repo => !repo.fork) as Repository[];
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
      throw error;
    }
  }

  /**
   * Transforma repositórios em projetos para o portfólio
   */
  static async getProjects(): Promise<Project[]> {
    try {
      const repositories = await this.getRepositories();
      console.log('Total repositórios encontrados:', repositories.length);

      const filteredRepos = repositories.filter(repo => !repo.archived && repo.description);
      console.log('Repositórios após filtro (não arquivados e com descrição):', filteredRepos.length);

      const projects = filteredRepos.map(repo => ({
          id: repo.id.toString(),
          title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          description: repo.description || 'Sem descrição disponível',
          technologies: this.extractTechnologies(repo),
          liveUrl: repo.homepage || undefined,
          githubUrl: repo.html_url,
          featured: true, // Todos os projetos com descrição são considerados featured
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          lastUpdated: repo.updated_at,
        }))
        .sort((a, b) => {
          // Projetos featured primeiro, depois por stars, depois por data de atualização
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.stars !== b.stars) return b.stars - a.stars;
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        });

      console.log('Projetos processados:', projects.length);
      console.log('Primeiros 3 projetos:', projects.slice(0, 3));

      return projects;
    } catch (error) {
      console.error('Erro ao processar projetos:', error);
      throw error;
    }
  }

  /**
   * Extrai tecnologias baseado na linguagem principal e tópicos do repositório
   */
  private static extractTechnologies(repo: Repository): string[] {
    const technologies: Set<string> = new Set();

    // Adiciona a linguagem principal
    if (repo.language) {
      technologies.add(repo.language);
    }

    // Adiciona tecnologias baseadas nos tópicos
    repo.topics.forEach(topic => {
      const normalizedTopic = this.normalizeTechnology(topic);
      if (normalizedTopic) {
        technologies.add(normalizedTopic);
      }
    });

    return Array.from(technologies);
  }

  /**
   * Normaliza nomes de tecnologias comuns
   */
  private static normalizeTechnology(topic: string): string | null {
    const techMap: Record<string, string> = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'react': 'React',
      'nextjs': 'Next.js',
      'nodejs': 'Node.js',
      'express': 'Express',
      'mongodb': 'MongoDB',
      'postgresql': 'PostgreSQL',
      'mysql': 'MySQL',
      'python': 'Python',
      'django': 'Django',
      'flask': 'Flask',
      'java': 'Java',
      'spring': 'Spring',
      'docker': 'Docker',
      'kubernetes': 'Kubernetes',
      'aws': 'AWS',
      'gcp': 'Google Cloud',
      'azure': 'Azure',
      'firebase': 'Firebase',
      'sass': 'Sass',
      'css': 'CSS',
      'html': 'HTML',
      'vue': 'Vue.js',
      'angular': 'Angular',
      'svelte': 'Svelte',
      'php': 'PHP',
      'laravel': 'Laravel',
      'symfony': 'Symfony',
      'ruby': 'Ruby',
      'rails': 'Rails',
      'go': 'Go',
      'rust': 'Rust',
      'c++': 'C++',
      'c#': 'C#',
      'dotnet': '.NET',
    };

    const normalized = topic.toLowerCase().replace(/[^a-z0-9+#]/g, '');
    return techMap[normalized] || (topic.length > 2 ? topic : null);
  }

  /**
   * Busca estatísticas gerais do GitHub
   */
  static async getGitHubStats(): Promise<{
    totalStars: number;
    totalForks: number;
    totalRepositories: number;
    totalCommits: number;
  }> {
    try {
      const repositories = await this.getRepositories();

      const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
      const totalRepositories = repositories.length;

      // Para commits, seria necessário fazer uma requisição por repositório,
      // o que pode ser custoso. Por enquanto, vamos deixar como 0.
      const totalCommits = 0;

      return {
        totalStars,
        totalForks,
        totalRepositories,
        totalCommits,
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
}
