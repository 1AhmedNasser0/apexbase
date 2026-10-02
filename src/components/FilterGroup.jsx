export function FilterGroup({ label, value, options, onChange, optionLabels = {}, optionDescriptions = {} }) {
  return (
    <div className="filter-group">
      <div className="filter-label">{label}</div>
      <div className="filter-options" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`filter-chip${value === option ? ' is-selected' : ''}`}
            aria-pressed={value === option}
            aria-label={optionDescriptions[option] || optionLabels[option] || option}
            onClick={() => onChange(option)}
            title={optionDescriptions[option] || undefined}
          >
            {optionLabels[option] || option}
          </button>
        ))}
      </div>
    </div>
  );
}
