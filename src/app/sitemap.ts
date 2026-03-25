import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Configuração simulada, caso existam mais rotas ou artigos de blog,
  // eles devem ser importados dinamicamente aqui para gerar o sitemap.
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Exemplo de como adicionar mais páginas caso existam no futuro:
    // {
    //   url: `${baseUrl}/projetos`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];
}
