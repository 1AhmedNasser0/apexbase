import { FilterGroup } from '../components/FilterGroup.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { SearchField } from '../components/SearchField.jsx';
import { SubjectCard } from '../components/SubjectCard.jsx';
import { specializationOptions, specializationNames, subjects, termOptions } from '../data/subjects.js';
import { resourceMatches, subjectMatches } from '../utils/archive.js';

const specializationFilters = ['All', ...specializationOptions];
const termFilters = ['All', ...termOptions];

export function Home({ query, onQueryChange, specialization, onSpecializationChange, term, onTermChange, onOpenSubject }) {
  const visibleSubjects = subjects.filter((subject) => {
    const matchesSpecialization = specialization === 'All' || subject.specializations.includes(specialization);
    const matchesTerm = term === 'All' || subject.term === term;
    return matchesSpecialization && matchesTerm && subjectMatches(subject, query);
  });

  const hasActiveFilters = query.trim() || specialization !== 'All' || term !== 'All';

  return (
    <main className="main-shell">
      <section className="page-intro" aria-labelledby="home-title">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" />A student-first archive</p>
          <h1 id="home-title">Explore subjects</h1>
          <p className="page-intro-description">Browse by specialization or term, then open the material you need.</p>
        </div>
        <div className="archive-count-card" aria-label={`${subjects.length} subjects in the archive`}>
          <span className="archive-count-number">{String(subjects.length).padStart(2, '0')}</span>
          <span className="archive-count-label">subjects<br />in the archive</span>
        </div>
      </section>

      <section className="browse-tools" aria-label="Search and filter subjects">
        <SearchField
          value={query}
          onChange={onQueryChange}
          placeholder="Search subjects, resources, sections..."
          label="Search subjects and resources"
          id="home-search"
        />
        <div className="filter-panel">
          <FilterGroup
            label="Specialization"
            options={specializationFilters}
            value={specialization}
            onChange={onSpecializationChange}
            optionLabels={{ All: 'All', AI: 'AI', CS: 'CS', IT: 'IT' }}
            optionDescriptions={{ AI: specializationNames.AI, CS: specializationNames.CS, IT: specializationNames.IT }}
          />
          <div className="filter-divider" aria-hidden="true" />
          <FilterGroup
            label="Term"
            options={termFilters}
            value={term}
            onChange={onTermChange}
            optionLabels={{ 'Unassigned': 'Unassigned' }}
          />
        </div>
      </section>

      <section className="subjects-section" aria-labelledby="subjects-title">
        <div className="section-heading">
          <div>
            <h2 id="subjects-title">Subjects</h2>
            <p className="section-description">
              {visibleSubjects.length === subjects.length && !hasActiveFilters
                ? 'All courses, in one place.'
                : `${visibleSubjects.length} of ${subjects.length} subjects`}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              className="reset-filters"
              type="button"
              onClick={() => {
                onQueryChange('');
                onSpecializationChange('All');
                onTermChange('All');
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {visibleSubjects.length > 0 ? (
          <div className="subject-grid">
            {visibleSubjects.map((subject) => {
              const matchingResources = query.trim()
                ? subject.resources.filter((resource) => resourceMatches(resource, query)).length
                : 0;
              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={subjects.indexOf(subject)}
                  matchingResources={matchingResources}
                  onOpen={() => onOpenSubject(subject.id)}
                />
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No subjects found"
            message="Try a different search or clear your filters to browse the full archive."
            actionLabel="Clear search and filters"
            onAction={() => {
              onQueryChange('');
              onSpecializationChange('All');
              onTermChange('All');
            }}
            icon="search"
          />
        )}
      </section>
      <p className="home-note">Terms marked <span className="inline-unassigned"><span className="term-dot" />unassigned</span> will be updated when official course information is available.</p>
    </main>
  );
}
