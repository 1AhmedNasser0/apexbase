import { useEffect, useLayoutEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Home } from './pages/Home.jsx';
import { SubjectPage } from './pages/SubjectPage.jsx';
import { subjects } from './data/subjects.js';

const THEME_KEY = 'apexbase-theme';

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readSubjectId() {
  return new URLSearchParams(window.location.search).get('subject');
}

function routeFor(subjectId = null) {
  const url = new URL(import.meta.env.BASE_URL, window.location.origin);
  if (subjectId) url.searchParams.set('subject', subjectId);
  return `${url.pathname}${url.search}`;
}

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(readSubjectId);
  const [query, setQuery] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [term, setTerm] = useState('All');
  const [theme, setTheme] = useState(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#111a16' : '#f7f9f7';
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The selected theme still works for this visit when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => setSelectedSubjectId(readSubjectId());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (subjectId = null) => {
    window.history.pushState({}, '', routeFor(subjectId));
    setSelectedSubjectId(subjectId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    // Update the root immediately so the whole page changes in the same click.
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    setTheme(nextTheme);
  };

  const activeSubject = subjects.find((subject) => subject.id === selectedSubjectId);

  return (
    <div className="app-shell" data-theme={theme}>
      <Header onHome={() => navigate(null)} theme={theme} onToggleTheme={toggleTheme} />
      {activeSubject ? (
        <SubjectPage
          key={activeSubject.id}
          subject={activeSubject}
          query={query}
          onQueryChange={setQuery}
          onBack={() => navigate(null)}
        />
      ) : (
        <Home
          query={query}
          onQueryChange={setQuery}
          specialization={specialization}
          onSpecializationChange={setSpecialization}
          term={term}
          onTermChange={setTerm}
          onOpenSubject={navigate}
        />
      )}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span><strong>ApexBase</strong><span className="footer-separator">·</span>University Resources Archive</span>
          <span>Made for students.</span>
        </div>
      </footer>
    </div>
  );
}
