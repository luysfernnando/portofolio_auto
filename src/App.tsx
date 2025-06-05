import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { getTheme } from './styles/theme';
import { useTheme } from './hooks/useTheme';
import { useGitHub } from './hooks/useGitHub';
import { Header, Hero, About, Projects, Contact, Footer } from './components';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    user,
    projects,
    stats,
    loading,
    error,
    refreshData
  } = useGitHub();

  const theme = getTheme(isDark);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <div className="App">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
