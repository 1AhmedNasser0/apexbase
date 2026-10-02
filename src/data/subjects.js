// ApexBase's entire archive lives in this file. No database or admin panel is used.
// Terms are intentionally "Unassigned" until the official course terms are confirmed.
// Replace them with "First Term" or "Second Term" when you know the correct value.
//
// To add a resource, copy this shape into a subject's resources array and replace
// every example value with real course information and a real public/shared URL:
// {
//   id: 'alg-summary-01', // unique, URL-friendly identifier
//   title: 'Algorithms Summary',
//   type: 'Summary', // e.g. Book, Previous Exam, Section, Lecture, Notes, Slides...
//   section: '', // e.g. 'Section 1'; leave empty when not applicable
//   date: '2026-09-20', // YYYY-MM-DD, or '' if unknown
//   description: 'Course summary',
//   linkType: 'Google Drive', // e.g. Google Sheets, Google Docs, Excel, PDF, External
//   url: 'https://drive.google.com/YOUR_REAL_SHARED_LINK',
// }
// Do not publish placeholder links. Subjects below start with empty resource lists
// // because no real resource links were supplied.
//------------------------------------------------------------------------------------------
// git add .
// git commit -m "update project"
// git push

export const specializationOptions = ['AI', 'CS', 'IT'];
export const termOptions = ['First Term', 'Second Term', 'Unassigned'];

// Suggested resource types. The page's type filters are generated from the actual
// resources, so a new type added to a resource will appear automatically.
export const resourceTypes = [
  'Book',
  'Summary',
  'Previous Exam',
  'Section',
  'Lecture',
  'Notes',
  'Assignment',
  'Solution',
  'Slides',
  'Other',
];

export const specializationNames = {
  AI: 'Artificial Intelligence',
  CS: 'Computer Science',
  IT: 'Information Technology',
};

export const subjects = [
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    specializations: ['AI', 'CS', 'IT'],
    term: '[First Term]',
    resources: [
      {
        id: 'os-Book-pdf',
        title: 'OS Book pdf ',
        type: 'Book',
        section: '',
        date: '2026-10-01',
        description: 'مقدمة في أنظمة التشغيل والمفاهيم الأساسية',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/file/d/1bJT2hS5CmAFkUDxoXeHpZVNjC7QDbm6j/view?usp=sharing',
      },
      {
        id: 'os-Lectures-folder',
        title: 'Lecture Folder ',
        type: 'Lecture',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1rOGOXtiaTCLBqJdtQ5y80IGm6FmM5utg?usp=sharing',
      },
      {
        id: 'os-Sections-folder',
        title: 'Sections Folder ',
        type: 'Section',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1-YMANic0X_Em01SBYe7LK0hD229Rvt2h?usp=sharing',
      },
      {
        id: 'os-Summaries-folder',
        title: 'Summary Folder ',
        type: 'Summary',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1EjPqSNby2oTK2l-XjoLsoM7n-o6S08Ne?usp=sharing',
      },
      
    ],
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    specializations: ['AI', 'CS', 'IT'],
    term: 'First Term',
    resources: [
      {
        id: 'algo-Book-pdf',
        title: 'Algorithms Book pdf ',
        type: 'Book',
        section: '',
        date: '2026-10-01',
        description: 'Algorithms Book PDF ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/file/d/1ZY0iCqQqxIZhLdrXEcPdWVvV624Q1O2v/view?usp=sharing',
      },
      {
        id: 'Algo-Lectures-folder',
        title: 'Lectures Folder ',
        type: 'Lecture',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1OH9tA4gXxLvmS8tvUGknIkVylPbBZNZ7?usp=sharing',
      },
      {
        id: 'Algo-Sections-folder',
        title: 'Sections Folder ',
        type: 'Section',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1U1nHfxStzmLWgQo-hm_ac1Q3BraoNlo9?usp=sharing',
      },
      {
        id: 'Algo-Summaries-folder',
        title: 'Summary Folder ',
        type: 'Summary',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/15K795DG_KJUHJRDYaIlQjcf7mczdGsZO?usp=sharing',
      },
      
    ],
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    specializations: ['AI', 'CS'],
    term: 'First Term',
    resources: [
      {
        id: 'AI-Book-pdf',
        title: 'AI Book pdf ',
        type: 'Book',
        section: '',
        date: '2026-10-01',
        description: 'Algorithms Book PDF ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/file/d/19BsOJhUDlO7XyvIfAQ-HfMCaV1y2629J/view?usp=sharing',
      },
      {
        id: 'AI-Lectures-folder',
        title: 'Lectures Folder ',
        type: 'Lecture',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1un58_l-tdJ4asfMZmOQkman78ozB7Yog?usp=sharing',
      },
      {
        id: 'AI-Sections-folder',
        title: 'Sections Folder ',
        type: 'Section',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1kr4p0eZnEDYY7T0IHprOwPJ_B1uCxVGu?usp=sharing',
      },
      {
        id: 'AI-Summaries-folder',
        title: 'Summary Folder ',
        type: 'Summary',
        section: '',
        date: '2026-10-01',
        description: 'كل ملفات المحاضرة ',
        linkType: 'Google Drive',
        url: 'https://drive.google.com/drive/folders/1j4CaxQZW9YQonYxVj3PN2IwqRf00nmC-?usp=sharing',
      },
      
    ],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    specializations: ['AI'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'probabilistic-thinking',
    name: 'Probabilistic Thinking',
    specializations: ['AI'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    specializations: ['CS'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'image-processing',
    name: 'Image Processing',
    specializations: ['CS'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'signals-and-systems',
    name: 'Signals and Systems',
    specializations: ['IT'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'data-transmission',
    name: 'Data Transmission',
    specializations: ['IT'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'microcontrollers',
    name: 'Microcontrollers',
    specializations: ['IT'],
    term: 'First Term',
    resources: [],
  },
  {
    id: 'Data-Structures-2',
    name: 'Data Structures 2 ',
    specializations: ['CS'],
    term: '[First Term]',
    resources: []
  },
];
