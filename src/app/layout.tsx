import { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../app/globals.css';
import { AppProviders } from '../components/infrastructure/AppProviders';
import ClientGuard from '../components/infrastructure/ClientGuard';
import { WebVitals } from '../components/infrastructure/WebVitals';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import StyledComponentsRegistry from '../lib/styled-registry';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// JSON-LD estendido para o perfil do desenvolvedor (Schema.org)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Meu Portfólio',
  jobTitle: 'Desenvolvedor',
  url: baseUrl,
  sameAs: [
    'https://github.com/luysfernnando',
    // Adicionar LinkedIn ou outras redes aqui
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Meu Portfólio - Desenvolvedor',
  description: 'Portfólio pessoal com projetos do GitHub automaticamente sincronizados',
  keywords: ['desenvolvedor', 'portfolio', 'github', 'projetos', 'web development'],
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon/android-chrome-512x512.png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Meu Portfólio - Desenvolvedor',
    description: 'Portfólio pessoal com projetos do GitHub automaticamente sincronizados',
    siteName: 'Meu Portfólio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meu Portfólio - Desenvolvedor',
    description: 'Portfólio pessoal com projetos do GitHub automaticamente sincronizados',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientGuard />
        <WebVitals />
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

