# Portfolio Next.js

Portfolio curado de Luys Fernnando Ribeiro Caetano Brasil, Desenvolvedor Full Stack em Goiânia-GO.

A landing page destaca experiencia em sistemas publicos criticos, o case Electios e canais de contato. A homepage nao busca nem lista repositorios do GitHub em runtime.

## Conteudo

- Hero editorial com area reservada para caricatura/retrato.
- Perfil profissional baseado no curriculo.
- Case principal Electios, com contexto, escala, stack e capacidades.
- Experiencias TRE-GO e SEDS.
- Stack tecnica e formulario de contato.

## Tecnologias

- Next.js com App Router
- React
- TypeScript
- Styled Components
- Framer Motion
- React Intersection Observer

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Personalizacao

- Cores e tema: `src/styles/theme.ts`
- Estilos globais e primitives: `src/styles/GlobalStyle.ts`
- Conteudo da landing page: `src/components/Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`
- Metadata: `src/app/layout.tsx`
