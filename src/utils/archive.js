import { specializationNames } from '../data/subjects.js';

export function normalizeSearch(value = '') {
  return value.trim().toLocaleLowerCase();
}

export function resourceMatches(resource, query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;

  const searchableText = [
    resource.title,
    resource.type,
    resource.section,
    resource.description,
    resource.linkType,
  ].filter(Boolean).join(' ').toLocaleLowerCase();

  return searchableText.includes(normalized);
}

export function subjectMatches(subject, query) {
  const normalized = normalizeSearch(query);
  if (!normalized) return true;

  const specializationText = subject.specializations
    .flatMap((code) => [code, specializationNames[code]])
    .filter(Boolean)
    .join(' ');
  const subjectText = [subject.name, specializationText, subject.term].filter(Boolean).join(' ').toLocaleLowerCase();

  return subjectText.includes(normalized) || subject.resources.some((resource) => resourceMatches(resource, normalized));
}

export function formatArchiveDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function sectionNumber(resource) {
  const label = `${resource.section || ''} ${resource.title || ''}`;
  const match = label.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

export function sortResources(resources, sortBy) {
  return [...resources].sort((a, b) => {
    const aDate = a.date || '';
    const bDate = b.date || '';
    const aName = (a.title || '').toLocaleLowerCase();
    const bName = (b.title || '').toLocaleLowerCase();
    const sectionOrder = sectionNumber(a) - sectionNumber(b) || (a.section || a.title || '').localeCompare(b.section || b.title || '', undefined, { numeric: true, sensitivity: 'base' });

    switch (sortBy) {
      case 'oldest':
        return (aDate || '9999').localeCompare(bDate || '9999') || aName.localeCompare(bName);
      case 'name-asc':
        return aName.localeCompare(bName, undefined, { numeric: true });
      case 'name-desc':
        return bName.localeCompare(aName, undefined, { numeric: true });
      case 'section-asc':
        return sectionOrder || aName.localeCompare(bName, undefined, { numeric: true });
      case 'section-desc':
        return -sectionOrder || bName.localeCompare(aName, undefined, { numeric: true });
      case 'newest':
      default:
        return (bDate || '').localeCompare(aDate || '') || aName.localeCompare(bName);
    }
  });
}
