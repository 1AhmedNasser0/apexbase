import { Icon } from './Icon.jsx';

export function SearchField({ value, onChange, placeholder, label, id = 'archive-search' }) {
  return (
    <div className="search-field">
      <Icon name="search" size={20} className="search-field-icon" />
      <label className="sr-only" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) onChange('');
        }}
        placeholder={placeholder}
        autoComplete="off"
      />
      {value && (
        <button className="search-clear" type="button" onClick={() => onChange('')} aria-label="Clear search">
          <Icon name="close" size={17} />
        </button>
      )}
      {!value && <span className="search-hint" aria-hidden="true">Search</span>}
    </div>
  );
}
