"use client";
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { useGitHub } from '../hooks/useGitHub';

export default function HomePage() {
  const { user, projects, stats, loading, error, refreshData } = useGitHub();

  return (
    <main>
      <Hero user={user} stats={stats} />
      <About />
      <Projects
        projects={projects}
        loading={loading}
        error={error}
        onRefresh={refreshData}
      />
      <Contact />
    </main>
  );
}
