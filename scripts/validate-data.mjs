import assert from 'node:assert/strict';
import { subjects, specializationOptions, termOptions, resourceTypes } from '../src/data/subjects.js';
import { resourceMatches, subjectMatches, sortResources } from '../src/utils/archive.js';

const expected = new Map([
  ['Operating Systems', ['AI', 'CS', 'IT']],
  ['Algorithms', ['AI', 'CS', 'IT']],
  ['Artificial Intelligence', ['AI', 'CS']],
  ['Data Science', ['AI']],
  ['Probabilistic Thinking', ['AI']],
  ['Software Engineering', ['CS']],
  ['Image Processing', ['CS']],
  ['Signals and Systems', ['IT']],
  ['Data Transmission', ['IT']],
  ['Microcontrollers', ['IT']],
]);

assert.equal(subjects.length, expected.size, 'The archive should contain the ten requested subjects.');
assert.deepEqual(specializationOptions, ['AI', 'CS', 'IT']);
assert.ok(termOptions.includes('First Term') && termOptions.includes('Second Term') && termOptions.includes('Unassigned'));
assert.ok(resourceTypes.includes('Previous Exam') && resourceTypes.includes('Section'));

const subjectIds = new Set();
const resourceIds = new Set();
for (const subject of subjects) {
  assert.ok(expected.has(subject.name), `Unexpected subject: ${subject.name}`);
  assert.deepEqual(subject.specializations, expected.get(subject.name), `Incorrect specializations for ${subject.name}`);
  assert.ok(subject.id && !subjectIds.has(subject.id), `Subject id must be present and unique: ${subject.id}`);
  subjectIds.add(subject.id);
  assert.ok(['First Term', 'Second Term', 'Unassigned'].includes(subject.term), `Invalid term for ${subject.name}`);
  assert.ok(Array.isArray(subject.resources), `${subject.name} must have a resources array.`);

  for (const resource of subject.resources) {
    assert.ok(resource.id && !resourceIds.has(resource.id), `Resource id must be present and unique: ${resource.id}`);
    resourceIds.add(resource.id);
    assert.ok(resource.title && resource.type, `Resource title and type are required in ${subject.name}.`);
    if (resource.url) {
      assert.match(resource.url, /^https?:\/\//, `Resource URLs must be public HTTP(S) links: ${resource.id}`);
    }
  }
}

// Check the combinations and the same matching/sorting helpers used by the UI.
assert.equal(subjects.filter((subject) => subject.specializations.includes('AI') && subject.term === 'Unassigned').length, 5);
const fixture = {
  id: 'fixture',
  name: 'Algorithms',
  specializations: ['AI', 'CS', 'IT'],
  term: 'Unassigned',
  resources: [
    { id: 'fixture-10', title: 'Algorithms Section 10', type: 'Section', section: 'Section 10', date: '2026-09-20', description: '', linkType: 'PDF', url: 'https://example.com/section-10.pdf' },
    { id: 'fixture-2', title: 'Algorithms Section 2', type: 'Section', section: 'Section 2', date: '2026-09-15', description: '', linkType: 'Google Drive', url: 'https://drive.google.com/example' },
    { id: 'fixture-exam', title: 'Algorithms Midterm', type: 'Previous Exam', section: '', date: '2026-09-25', description: 'Practice paper', linkType: 'PDF', url: 'https://example.com/midterm.pdf' },
  ],
};
assert.ok(subjectMatches(fixture, 'Algorithms'));
assert.ok(subjectMatches(fixture, 'Midterm'));
assert.ok(subjectMatches(fixture, 'Section 3') === false);
assert.ok(resourceMatches(fixture.resources[2], 'Previous Exam'));
assert.ok(resourceMatches(fixture.resources[0], 'Section 10'));
assert.deepEqual(sortResources(fixture.resources.filter((item) => item.type === 'Section'), 'section-asc').map((item) => item.id), ['fixture-2', 'fixture-10']);
assert.deepEqual(sortResources(fixture.resources, 'newest').map((item) => item.id), ['fixture-exam', 'fixture-10', 'fixture-2']);

console.log(`Archive data is valid: ${subjects.length} subjects, ${resourceIds.size} resources. Search, filters, and sorting checks passed.`);
