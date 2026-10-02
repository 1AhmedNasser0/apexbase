import { Icon } from './Icon.jsx';

export function Header({ onHome, theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button className="brand-button" type="button" onClick={onHome} aria-label="ApexBase home">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="bookOpen" size={21} strokeWidth={1.9} />
          </span>
          <span className="brand-copy">
            <span className="brand-name">Apex<span>Base</span></span>
            <span className="brand-subtitle">University Resources Archive</span>
          </span>
        </button>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Turn off dark mode' : 'Turn on dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Dark mode is on' : 'Dark mode is off'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              <Icon name={isDark ? 'moon' : 'sun'} size={17} />
            </span>
            <span className="theme-toggle-label">Dark mode</span>
            <span className="theme-switch-track" aria-hidden="true">
              <span className="theme-switch-thumb" />
            </span>
          </button>
          <div className="archive-status" aria-label="Public student archive">
            <span className="status-dot" />
            <span>Student archive</span>
          </div>
        </div>
      </div>
    </header>
  );
}
