import { Icon } from './Icon.jsx';
import { formatArchiveDate } from '../utils/archive.js';

const resourceIcon = {
  Book: 'book',
  Summary: 'file',
  'Previous Exam': 'exam',
  Section: 'layers',
  Lecture: 'lecture',
  Notes: 'file',
  Assignment: 'exam',
  Solution: 'file',
  Slides: 'lecture',
  Other: 'external',
};

function getSafeExternalUrl(value) {
  if (!value || /YOUR_|YOUR-LINK|placeholder|\.\.\./i.test(value)) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

export function ResourceCard({ resource }) {
  const safeUrl = getSafeExternalUrl(resource.url);
  const formattedDate = formatArchiveDate(resource.date);

  return (
    <article className="resource-row">
      <span className="resource-icon" aria-hidden="true">
        <Icon name={resourceIcon[resource.type] || 'file'} size={20} />
      </span>
      <div className="resource-content">
        <div className="resource-meta-top">
          <span className="resource-type-label">{resource.type || 'Other'}</span>
          {formattedDate && <time className="resource-date" dateTime={resource.date}>{formattedDate}</time>}
          {resource.section && <span className="resource-section-label">{resource.section}</span>}
        </div>
        <h3 className="resource-title">{resource.title}</h3>
        {resource.description && <p className="resource-description">{resource.description}</p>}
        {resource.linkType && (
          <span className="resource-link-type"><Icon name="external" size={13} />{resource.linkType}</span>
        )}
      </div>
      {safeUrl ? (
        <a className="open-resource" href={safeUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.title} in a new tab`}>
          <span>Open</span><Icon name="external" size={15} />
        </a>
      ) : (
        <span className="open-resource is-unavailable" aria-label="Resource link not available">Link unavailable</span>
      )}
    </article>
  );
}
