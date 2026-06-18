# AGENTS.md - AI assistant sales slides

## Project boundary

- Repository: `https://github.com/jacob-cloud-n8n/ai-assistant-reports.git`
- Local root: `/Users/jacob/Projects/2026 antig2/銷售專案`
- Production Hosting: `https://jacob-html-slides-2026.web.app`
- Firebase project: `jacob-html-slides-2026`

This directory is an independent Git repository. Read `ANTIGRAVITY.md` before editing.

## Firebase deployment (mandatory)

Deploy only through:

```bash
./deploy-firebase.sh
```

The script fixes the working directory, config path, and Firebase project ID. It also rebuilds `.firebase-deploy/` from an allowlist of web asset extensions so repository files cannot be published. Agents must not run a bare `firebase deploy` from this directory or any parent directory.

`course-docs/` is generated from `/Users/jacob/Projects/2026 html簡報製作/public-course-docs/` by that repo's `export-public-course-assets.sh`. Do not hand-edit generated course documents here. Only `course-docs/` may publish Markdown/PDF files; other repository documentation remains private.

Never deploy these slides with the parent repository's Firebase files. The parent `.firebaserc` targets `codex-jacob`, and the parent `public/` directory also contains unrelated applications.

## Safety

- Never commit Firebase tokens, API keys, cookies, or service-account files.
- Never use `git add .`; stage only files related to the current task.
- Keep paired Chinese and English HTML files synchronized.
- Verify the production URL after deployment.
