# Portfolio Next.js

Um portfólio pessoal moderno construído com Next.js que sincroniza automaticamente projetos do GitHub.

## 🚀 Funcionalidades

- **Sincronização automática** com repositórios do GitHub
- **SSG (Static Site Generation)** para performance máxima
- **Tema escuro/claro** com persistência local
- **Design responsivo** mobile-first
- **Animações suaves** com Framer Motion
- **SEO otimizado** com metadata dinâmica
- **Hospedagem no GitHub Pages**

## 🛠️ Tecnologias

- **Next.js 14** com App Router
- **React 18** com Server Components
- **Styled Components** para estilização
- **Framer Motion** para animações
- **GitHub API** para buscar repositórios
- **JavaScript** (ES6+)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.js          # Layout principal
│   ├── page.js            # Homepage
│   ├── loading.js         # Loading component
│   └── globals.css        # Estilos globais básicos
├── components/            # Componentes reutilizáveis
│   ├── Header.js
│   ├── ProjectsSection.js
│   ├── ProjectCard.js
│   └── Footer.js
├── contexts/              # Contexts do React
│   └── ThemeContext.js    # Gerenciamento de tema
├── lib/                   # Utilities e configurações
│   └── styled-registry.js # SSR para styled-components
└── styles/               # Styled-components
    └── GlobalStyles.js
```

## 🚀 Como usar

### Pré-requisitos
- Node.js 18+ instalado
- Conta no GitHub

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd portfolio-nextjs
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto
GITHUB_USERNAME=seu-usuario-github
GITHUB_TOKEN=seu-token-github (opcional, para rate limiting)
```

4. Execute o projeto localmente:
```bash
npm run dev
```

5. Acesse: http://localhost:3000

### Build para produção

```bash
npm run build
```

### Deploy no GitHub Pages

1. Configure o repositório no GitHub
2. Ative o GitHub Pages nas configurações
3. Configure o GitHub Actions (workflow já incluído)
4. Faça push para a branch main

## ⚙️ Configuração

### Variáveis de Ambiente

- `GITHUB_USERNAME`: Seu username do GitHub
- `GITHUB_TOKEN` (opcional): Token pessoal para aumentar rate limit

### Personalização

1. **Dados pessoais**: Edite os componentes Header e Footer
2. **Cores e tema**: Modifique `src/contexts/ThemeContext.js`
3. **Filtros de repositório**: Ajuste em `src/app/page.js`
4. **Links sociais**: Atualize no componente Footer

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: até 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Wide: 1025px+

## 🎨 Recursos Visuais

- **Animações**: Entrance animations, hover effects, smooth transitions
- **Temas**: Suporte completo a modo escuro/claro
- **Tipografia**: System fonts otimizadas
- **Layout**: CSS Grid e Flexbox moderno

## 🔧 Scripts Disponíveis

- `npm run dev`: Desenvolvimento local
- `npm run build`: Build de produção
- `npm run start`: Servidor de produção
- `npm run lint`: Verificação de código
- `npm run export`: Exportação estática

## 📈 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **Bundle Size**: Minimizado com tree-shaking
- **Images**: Otimização automática do Next.js

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação do Next.js](https://nextjs.org/docs)
2. Consulte a [API do GitHub](https://docs.github.com/en/rest)
3. Abra uma issue neste repositório

---

Feito com ❤️ usando Next.js
