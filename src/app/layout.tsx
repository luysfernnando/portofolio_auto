import { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../app/globals.css';
import { AppProviders } from '../components/infrastructure/AppProviders';
import ClientGuard from '../components/infrastructure/ClientGuard';
import { WebVitals } from '../components/infrastructure/WebVitals';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import StyledComponentsRegistry from '../lib/styled-registry';

export const metadata = {
  title: 'Luys Fernnando | Desenvolvedor Full Stack em Goiânia-GO',
  description: 'Portfolio de Luys Fernnando, Desenvolvedor Full Stack com 7+ anos em sistemas publicos criticos, TRE-GO, SEDS e Electios.',
  keywords: 'Luys Fernnando, Desenvolvedor Full Stack, Electios, TRE-GO, SEDS, Elixir, Phoenix, Goiânia',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Luys Fernnando | Electios e sistemas criticos',
    description: 'Portfolio profissional com foco no projeto Electios, experiencia em TRE-GO e SEDS, stack full stack e contato.',
    siteName: 'Luys Fernnando'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=JetBrains+Mono&family=Newsreader:opsz,wght@6..72,500;6..72,650;6..72,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppProviders>
            <Header />
            {children}
            <Footer />
          </AppProviders>
        </StyledComponentsRegistry>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}

