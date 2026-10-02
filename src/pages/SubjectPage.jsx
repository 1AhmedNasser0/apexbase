import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../components/EmptyState.jsx';
import { Icon } from '../components/Icon.jsx';
import { ResourceCard } from '../components/ResourceCard.jsx';
import { SearchField } from '../components/SearchField.jsx';
import { resourceTypes, specializationNames } from '../data/subjects.js';
import { sortResources, resourceMatches } from '../utils/archive.js';

const sortOptions = [
  ['newest', 'Newest first'],
  ['oldest', 'Oldest first'],
  ['name-asc', 'Name A–Z'],
  ['name-desc', 'Name Z–A'],
];

// These quick filters stay visible so students can see the archive categories
// even when a subject has not received any links yet.
const primaryTypeLabels = {
  Section: 'Sections',
  Lecture: 'Lectures',
  Summary: 'Summaries',
  'Previous Exam': 'Previous Exams',
};
const primaryTypes = Object.keys(primaryTypeLabels);

export function SubjectPage({ subject, query, onQueryChange, onBack }) {
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setSelectedType('All');
    setSortBy('newest');
  }, [subject.id]);

  const availableTypes = useMemo(() => {
    const present = new Set(subject.resources.map((resource) => resource.type || 'Other'));
    return resourceTypes.filter((type) => present.has(type)).concat(
      [...present].filter((type) => !resourceTypes.includes(type)).sort((a, b) => a.localeCompare(b)),
    );
  }, [subject]);

  const typeFilters = useMemo(() => {
    const countFor = (type) => subject.resources.filter((resource) => (resource.type || 'Other') === type).length;
    const primaryFilters = primaryTypes.map((type) => ({ value: type, label: primaryTypeLabels[type], count: countFor(type) }));
    const additionalFilters = availableTypes
      .filter((type) => !primaryTypes.includes(type))
      .map((type) => ({ value: type, label: type, count: countFor(type) }));

    return [
      { value: 'All', label: 'All', count: subject.resources.length },
      ...primaryFilters,
      ...additionalFilters,
    ];
  }, [availableTypes, subject]);

  const hasSections = subject.resources.some((resource) => resource.type === 'Section');

  const visibleResources = useMemo(() => {
    const filtered = subject.resources.filter((resource) => {
      const matchesType = selectedType === 'All' || (resource.type || 'Other') === selectedType;
      return matchesType && resourceMatches(resource, query);
    });
    return sortResources(filtered, sortBy);
  }, [subject, selectedType, query, sortBy]);

  const termIsUnassigned = subject.term === 'Unassigned';
  const showNoResources = subject.resources.length === 0;

  return (
    <main className="main-shell subject-page">
      <button className="back-link" type="button" onClick={onBack}>
        <Icon name="arrowLeft" size={17} />
        <span>Back to subjects</span>
      </button>

      <section className="subject-heading" aria-labelledby="subject-title">
        <div className="subject-heading-mark" aria-hidden="true"><Icon name="bookOpen" size={24} /></div>
        <div className="subject-heading-copy">
          <p className="eyebrow">Subject archive</p>
          <h1 id="subject-title">{subject.name}</h1>
          <div className="subject-heading-meta">
            <span className="specialization-list" aria-label={`Specializations: ${subject.specializations.join(', ')}`}>
              {subject.specializations.map((code) => <span key={code} className="specialization-tag" title={specializationNames[code]}>{code}</span>)}
            </span>
            <span className={`term-tag${termIsUnassigned ? ' term-unassigned' : ''}`}>
              <span className="term-dot" />
              {termIsUnassigned ? 'Term unassigned' : subject.term}
            </span>
            <span className="subject-heading-count">
              <Icon name="file" size={14} />
              {subject.resources.length} {subject.resources.length === 1 ? 'resource' : 'resources'}
            </span>
          </div>
        </div>
      </section>

      <section className="subject-resource-section" aria-labelledby="resources-title">
        <div className="resource-section-heading">
          <div>
            <h2 id="resources-title">Resources</h2>
            <p className="section-description">
              {showNoResources ? 'Course materials will appear here.' : `${visibleResources.length} of ${subject.resources.length} resources`}
            </p>
          </div>
          <label className="sort-select-wrap">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort resources">
              {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              {hasSections && <option value="section-asc">Section number ↑</option>}
              {hasSections && <option value="section-desc">Section number ↓</option>}
            </select>
          </label>
        </div>

        <SearchField
          value={query}
          onChange={onQueryChange}
          placeholder="Search resources, types, or sections..."
          label={`Search resources in ${subject.name}`}
          id="resource-search"
        />

        <div className="resource-type-filters" role="group" aria-label="Filter resources by type">
          <span className="resource-filter-label"><Icon name="filter" size={15} />Resource type</span>
          {typeFilters.map(({ value, label, count }) => (
            <button
              type="button"
              key={value}
              className={`type-chip${selectedType === value ? ' is-selected' : ''}`}
              aria-pressed={selectedType === value}
              aria-label={`${label}, ${count} ${count === 1 ? 'resource' : 'resources'}`}
              onClick={() => setSelectedType(value)}
            >
              <span>{label}</span>
              <span className="type-chip-count" aria-hidden="true">{count}</span>
            </button>
          ))}
        </div>

        {showNoResources ? (
          <EmptyState title="No resources available yet." message="Check back later." icon="folder" />
        ) : visibleResources.length > 0 ? (
          <div className="resource-list">
            {visibleResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
          </div>
        ) : (
          <EmptyState
            title="No resources match your search"
            message="Try another keyword or reset the resource filters."
            actionLabel="Clear search and filters"
            onAction={() => {
              onQueryChange('');
              setSelectedType('All');
            }}
            icon="search"
          />
        )}
      </section>
    </main>
  );
}
