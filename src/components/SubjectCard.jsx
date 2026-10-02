import { Icon } from './Icon.jsx';
import { specializationNames } from '../data/subjects.js';

function monogram(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function SubjectCard({ subject, index, matchingResources, onOpen }) {
  const count = subject.resources.length;
  const termIsUnassigned = subject.term === 'Unassigned';

  return (
    <button className="subject-card" type="button" onClick={onOpen} aria-label={`Open ${subject.name}`}>
      <span className="subject-card-top">
        <span className={`subject-monogram tone-${index % 5}`} aria-hidden="true">{monogram(subject.name)}</span>
        <span className="subject-open-icon" aria-hidden="true"><Icon name="arrowRight" size={18} /></span>
      </span>
      <span className="subject-card-title">{subject.name}</span>
      <span className="specialization-list" aria-label={`Specializations: ${subject.specializations.join(', ')}`}>
        {subject.specializations.map((code) => <span key={code} className="specialization-tag" title={specializationNames[code]}>{code}</span>)}
      </span>
      <span className="subject-card-bottom">
        <span className={`term-tag${termIsUnassigned ? ' term-unassigned' : ''}`}>
          <span className="term-dot" />
          {termIsUnassigned ? 'Term unassigned' : subject.term}
        </span>
        <span className="resource-count">
          <Icon name="file" size={14} />
          {count} {count === 1 ? 'resource' : 'resources'}
        </span>
      </span>
      {matchingResources > 0 && (
        <span className="subject-match-note">{matchingResources} matching {matchingResources === 1 ? 'resource' : 'resources'}</span>
      )}
    </button>
  );
}
