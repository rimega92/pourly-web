# Pourly · Web

Product site for the Pourly iOS app, with its privacy policy and support page, in Spanish and English. Plain HTML and CSS, no build step, served by GitHub Pages.

| Page | Path | Used for |
|---|---|---|
| Home | `index.html` | Product page |
| Privacy | `privacy.html` | App Store Connect "Privacy Policy URL" and the link inside the app |
| Support | `support.html` | App Store Connect "Support URL" |
| What's new | `changelog.html` | Release notes, one entry per version |
| Not found | `404.html` | Served by GitHub Pages for missing paths |

## Publish with GitHub Pages

1. Create a **public** repository named `pourly-web` on GitHub.
2. From this folder:

   ```sh
   git init -b main
   git add .
   git commit -m "Pourly website"
   git remote add origin https://github.com/rimega92/pourly-web.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
4. After a minute the site is live at:
   - https://rimega92.github.io/pourly-web/
   - https://rimega92.github.io/pourly-web/privacy.html
   - https://rimega92.github.io/pourly-web/support.html

The support page sends people to this repository's **Issues**, so keep Issues turned on (Settings → General → Features).

## Updating

- Screenshots come from the app repo (`scripts/screenshots.sh` → `docs/screenshots/`); copy them into `assets/screenshots/`.
- When the app changes how it handles data, update `privacy.html` and its "last updated" date **before** releasing that version.
- Language: each text exists twice, with `lang="es"` and `lang="en"`; `assets/site.js` shows the visitor's language and remembers their choice.

## Working with Claude Code

[`CLAUDE.md`](CLAUDE.md) describes how the site is built (languages, appearance, screenshots) and the rules it must keep, and is loaded at the start of every Claude Code session.
