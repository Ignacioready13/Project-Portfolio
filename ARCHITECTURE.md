# Architecture & Handoff Notes

Written so another AI (or developer) can pick this project up with minimal context.

## 1. Overview

Static, dependency-free portfolio site for GitHub Pages. No frameworks, no build step, no npm. Three concerns, cleanly separated:

| Concern | File | Notes |
| --- | --- | --- |
| Content | `content.js` | Single JS array (`PROJECTS`) the owner edits. |
| Rendering | `app.js` | Vanilla JS; builds tabs, panels, carousels from `PROJECTS`. |
| Style | `styles.css` | Light theme, muted blue/indigo accent. |

`index.html` loads `content.js` then `app.js` as plain `<script>` tags (NOT ES modules), so the site works when opened directly via `file://` too (ES modules would be blocked by CORS on `file://`).

## 2. File map

```
index.html         Page shell: header, tabs <nav>, toolbar (GitHub button),
                   <main id="panels">, footer. Static; only header/footer text
                   is meant to be edited here.
styles.css         All styling. CSS custom properties in :root hold the design
                   tokens (colors, radius, shadows).
content.js         ★ Owner-edited content. `const PROJECTS = [ ... ]`.
app.js             IIFE that reads PROJECTS and renders everything.
media/             Web-ready media, one subfolder per project (e.g. racing-game/).
media/placeholders/ Small SVG placeholder images for the demo tabs.
media - racing game/  Original source media (HEIC + 60MB video). Git-ignored.
.nojekyll          Empty file; tells GitHub Pages to serve files as-is.
.gitignore         Ignores the source media folder + OS junk.
```

## 3. Content schema (`content.js`)

`PROJECTS` is an array of project objects:

```
{
  tab: string,            // short label shown on the tab button
  title: string,          // full name (H2 at top of the panel)
  subtitle?: string,      // optional muted line under the title
  github?: string,        // optional URL → "View on GitHub" button under the tabs
  summary: Array<{
    heading: string,      // "" = no sub-header (plain paragraphs)
    paragraphs: string[]
  }>,
  skills: string[],       // rendered as chips
  gallery: Array<{
    type: "image" | "video",
    src: string,          // relative path, e.g. "media/racing-game/full-view.jpg"
    caption?: string
  }>
}
```

Media paths are relative (no leading `/`) so the site works under a subpath (`username.github.io/repo/`) and over `file://`.

## 4. Rendering flow (`app.js`)

1. `buildTabs()` → one `<button role="tab">` per project in `#tabs`. Keyboard support: ArrowLeft/Right, Home/End.
2. `buildPanels()` → one `<section role="tabpanel" class="panel">` per project. Inside each panel, in order: title (H2) → subtitle → summary blocks → "Gallery" label + carousel → "Skills" label + chips. Only the first panel gets `.active` (shown).
3. `switchTab(i)` toggles `aria-selected` on tabs, `.active` on panels, and shows/hides the GitHub button (`#toolbar`) based on `proj.github`.
4. `buildCarousel(items)` builds a self-contained carousel: a flex `.track` translated by `-index*100%`, prev/next arrow buttons, dot indicators, a "n / N" counter, and a caption. Videos are `muted loop playsinline controls` with `preload="metadata"` (no autoplay). Switching slides pauses all videos. If there is ≤1 item, arrows/dots/counter are hidden.

Content is inserted via `document.createElement` + `textContent` (no innerHTML), so user text is never interpreted as HTML (no injection risk).

## 5. Design system (`styles.css`)

Tokens in `:root`:

- Background `#f7f8fa`, surface `#ffffff`, text `#1c2430`, soft text `#333d4d`, muted `#64748b`, border `#e6e8ec`.
- Accent (muted indigo) `#4f46e5`, hover `#4338ca`, soft `#eef2ff`, accent border `#e0e7ff`.
- Radius 12px; shadows `--shadow-sm` / `--shadow-md`.
- System font stack (no external fonts).
- Light theme only (no dark mode). `<meta name="color-scheme" content="light">` is set to discourage auto-darkening.

Layout: `.page` max-width 920px centered. Carousel viewport uses `aspect-ratio: 16/10` (4/3 on ≤560px) with images `object-fit: contain` on a neutral `#eef0f3` background (no cropping). Responsive breakpoint at 560px.

Note: `[hidden] { display: none !important; }` is required because `.toolbar` and `.btn-github` set `display` explicitly, which would otherwise override the browser's default `[hidden]` rule.
## 6. Media pipeline (what was done)

ffmpeg (v8.x) was used; it is already installed on the author's machine. Original files were in `media - racing game/`; web-ready versions are in `media/racing-game/`.

- HEIC → JPG: HEIC here decodes as a **tiled HEVC grid**, so `-vf` cannot be applied in the same pass ("Simple and complex filtering cannot be used together"). Two-step fix:
  1. `ffmpeg -y -i in.HEIC -q:v 2 full.jpg`   (decode/untile)
  2. `ffmpeg -y -i full.jpg -vf "scale='min(1600,iw)':-2" -q:v 3 out.jpg`
- Video (1920×1088, 62s, 60MB, had audio) → web MP4, no audio, ~4.3MB:
  `ffmpeg -y -i in.mp4 -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart out.mp4`

Resulting files: full-view.jpg (502KB), prototype.jpg (256KB), wiring-topdown.jpg (208KB), wiring-closeup.jpg (327KB), racing-demo.mp4 (4.3MB).

## 7. Deployment (GitHub Pages)

- Repo-root deployment from `main`. `.nojekyll` present. All paths relative.
- Resulting URL: `https://<username>.github.io/<repo-name>/`.
- Enable via repo → Settings → Pages → Deploy from branch → main → /(root).

## 8. Gotchas / decisions

- **No dark mode** by design (explicit user requirement).
- **Videos are muted** (`muted` attribute) and never autoplay; audio is also stripped at encode time so files stay small.
- **HEIC is not browser-safe**; always convert to JPG/PNG/WebP.
- **`hidden` + `display`** conflict requires the `[hidden] {display:none}` rule.
- **No ES modules** so the page runs from `file://` (double-click preview).
- **GitHub button** is per-project (only renders when `github` is set).
- The carousel is custom (no libraries) to keep the site dependency-free.

## 9. Current status & next steps

- Site is fully built with 3 tabs: the real racing-game project + 2 placeholders.
- Media converted and committed-ready. Source media folder is git-ignored.
- Remaining: (1) owner creates the GitHub repo and pushes; (2) owner replaces the two placeholder projects with real content by editing `content.js`.

