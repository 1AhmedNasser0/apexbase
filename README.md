# ApexBase — University Resources Archive

A lightweight, public university archive built with React and Vite. Students can browse subjects and open their course resources in Google Drive, Google Sheets, Google Docs, Excel, PDF, or another external destination. ApexBase is a **100% static frontend**: there is no backend, database, login, admin system, or CMS.

## Features

- Browse the full subject list without needing to search
- Filter by AI, CS, or IT specialization
- Filter by First Term, Second Term, or unassigned term
- Search subject names and, once added, resource titles, types, descriptions, and section names
- Open subject pages and browse resources
- Filter resources inside each subject, with quick filters for Sections, Lectures, Summaries, and Previous Exams
- Sort resources by newest, oldest, name, or section number
- Open external resource links in a new tab
- Responsive, keyboard-accessible interface
- Light/dark mode toggle that remembers the choice in the browser
- GitHub Pages deployment through GitHub Actions

## Tech and architecture

- React + Vite
- All archive content is local project data in `src/data/subjects.js`
- Subject details and resources are rendered from that data file
- Subject pages use a query-string URL (for example, `?subject=algorithms`) so refreshing a page on GitHub Pages does not require a server-side route fallback
- The Vite production base is `/apexbase/`, matching `https://USERNAME.github.io/apexbase/`
- No database, API, authentication, third-party service, or externally hosted UI asset is required

## Local setup

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal (usually `http://localhost:5173/apexbase/`). The dev server is for local development only; the published website is static files from `dist/`.

## Validate and build

```bash
npm test
npm run build
```

The static production site is written to `dist/`. To inspect that output locally:

```bash
npm run preview
```

## Update subjects and resources

Open **`src/data/subjects.js`**. The ten requested subjects are already listed once each, with their shared AI / CS / IT specializations. Their terms are set to `Unassigned` because official term information was not provided; change a subject to `First Term` or `Second Term` only when you have confirmed it.

Each subject has a `resources` array. The arrays are intentionally empty until real resource links are available—ApexBase does not include invented course material or fake Drive links. To add a real resource, add an object inside the correct subject's array:

```javascript
{
  id: 'alg-summary-01',
  title: 'Algorithms Summary',
  type: 'Summary',
  section: '', // e.g. 'Section 1' for a section resource
  date: '2026-09-20', // YYYY-MM-DD; use '' if unknown
  description: 'Course summary',
  linkType: 'Google Drive', // Google Sheets, Google Docs, Excel, PDF, External, etc.
  url: 'https://drive.google.com/your-real-shared-link',
}
```

Use a unique `id` for each resource and paste the real share URL into `url`. The site opens the URL but does not fetch, host, or change file permissions. Make sure the file owner has shared it with the intended audience. Supported starting resource types are listed near the top of `src/data/subjects.js`; unknown types also display with a generic file icon and are automatically available as a filter when used.

To add a subject, copy one subject object in that same file, give it a unique `id`, and set its name, specializations, term, and resources. Shared subjects should remain a single object with multiple specialization codes.

After saving your edits:

```bash
git add .
git commit -m "Update resources"
git push
```

## Deploy to GitHub Pages

1. Create a GitHub repository named **`apexbase`** and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` installs dependencies, validates the data, builds the static site, and deploys the `dist/` artifact.
4. After the workflow succeeds, the site will be available at `https://USERNAME.github.io/apexbase/`.

The repository name and `base: '/apexbase/'` in `vite.config.js` must match. If you rename the repository, update the Vite base path too. No secrets or environment variables are needed.
