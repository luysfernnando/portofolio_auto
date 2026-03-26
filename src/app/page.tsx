import { Suspense } from 'react';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { getCachedProjects, getCachedStats, getCachedUserInfo } from '../services/github';

// Componentes de carregamento (Skeletons)
const Pulse = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const HeroSkeleton = () => (
  <div style={{
    height: '80vh',
    width: '100%',
    background: 'rgba(0,0,0,0.05)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }}>
    <style>{Pulse}</style>
  </div>
);

const ProjectsSkeleton = () => (
  <div style={{
    height: '600px',
    width: '100%',
    marginTop: '4rem',
    background: 'rgba(0,0,0,0.05)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  }}>
    <style>{Pulse}</style>
  </div>
);


async function HeroSection() {
  const [user, stats] = await Promise.all([
    getCachedUserInfo(),
    getCachedStats(),
  ]);
  return <Hero user={user} stats={stats} />;
}


async function ProjectsSection() {
  const projects = await getCachedProjects();
  return (
    <Projects
      projects={projects}
      loading={false}
      error={null}
    />
  );
}


export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <About />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Contact />
    </main>
  );
}
