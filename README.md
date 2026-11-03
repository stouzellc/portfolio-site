# Esaie Touze · portfolio site

Source for **[esaie-touze.pages.dev](https://esaie-touze.pages.dev)**: seven projects, a Studio map of 35 tools, and a proof chart that ties every tool to the work it shipped in.

Directed and built end to end with AI coding tools (Claude Code and Codex), then checked on desktop and mobile before every release.

## How it's built

- **Plain HTML, CSS and JavaScript.** No framework, no build step.
- **Content lives in data files.** `data/site.js` holds the home page, `data/projects.js` the projects, `data/studio.js` the Studio map. `app.js` and `studio.js` render the pages from them.
- **Strict security policy.** `_headers` sets `default-src 'self'`: no inline styles, no third-party scripts, a self-hosted font (Inter, SIL Open Font License).
- **Hosted on Cloudflare Pages.**
- **Release check.** Every upload is built from a staged copy. The check strips hidden projects, stops on private words or missing media, and tests the ZIP before upload.

## Run it locally

```bash
python3 -m http.server 8090
```

Then open http://127.0.0.1:8090.

## Credits

- About photo: MoFlicks.
- Font: Inter by Rasmus Andersson (SIL Open Font License, included in `fonts/inter/`).
- Tool names belong to their owners. Screenshots of private tools use demo or example data only.

© 2026 Esaie Touze. All rights reserved. The code is shared for review; please ask before reusing the design or content.
