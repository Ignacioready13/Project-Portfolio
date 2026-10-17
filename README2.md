# Ignacio Ready — Project Portfolio

A static, dependency-free engineering portfolio. No frameworks and no build
server: plain HTML/CSS/JS that runs straight from `file://` (double-click
`index.html`) and deploys to GitHub Pages as-is.

## Editing content

There are two things to edit, in two different places:

1. **Structure** — `content.js`: tabs, titles, subtitles, GitHub link, skills,
   and the gallery images/videos. One `{ ... }` block per project.
2. **Text** — `markdown/*.md`: the actual write-up. One Markdown file per
   project, named after the tab name (lowercase, spaces → dashes). For example
   the "Guitar restoration" tab maps to `markdown/guitar-restoration.md`.

After editing either, regenerate the site text:

```bash
python build.py
```

`build.py` scans `content.js`, creates any missing `markdown/*.md` placeholder,
and rebuilds `content.text.js` from the Markdown. Then open/refresh `index.html`.
Commit `content.text.js` too — the live GitHub Pages site reads it directly.

### Markdown format

```markdown
Intro paragraph with no heading.

## A section heading

More text, with **bold**, *italic*, `code`, and a [link](https://example.com).

- bullet one
- bullet two

1. numbered
2. items
```

- `## Heading` → a sub-heading (rendered with an accent dash).
- Text before the first heading becomes a plain intro paragraph.
- Blank lines separate paragraphs.

## Media

- Images: JPG / PNG / WebP (browsers can't show `.HEIC`).
- Videos: `.mp4`, ideally small and with **no audio** (they autoplay muted).

Put files under `media/<project>/` and point the `gallery` `src` at them, e.g.
`"media/racing-game/full-view.jpg"`. See `ARCHITECTURE.md` §6 for the exact
ffmpeg commands used to convert media.

## Deploying

Push to GitHub, then enable Pages (Settings → Pages → Deploy from branch →
`main` → `/ (root)`). `.nojekyll` is already present so files are served as-is.
