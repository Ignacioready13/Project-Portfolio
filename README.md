# Ignacio Ready — Project Portfolio

A simple, static portfolio website for showcasing engineering projects. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. Hosts directly on GitHub Pages.

## How it works (30-second version)

- Everything about your projects lives in **one file: `content.js`**.
- `index.html`, `styles.css`, and `app.js` do the rendering — you never need to edit them.
- To add or change a project, edit `content.js` and (optionally) drop images/videos into a folder under `media/`.

## Previewing locally

Just open `index.html` in your browser (double-click it). No server needed.

## Editing your content

Open `content.js` in any text editor (VS Code, Notepad, etc.). It contains a list called `PROJECTS`, one `{ ... }` block per project. Each block has these fields:

| Field | What it is |
| --- | --- |
| `tab` | Short name shown on the tab itself |
| `title` | Full project name shown at the top of the tab's content |
| `subtitle` | Optional one-line context (class, dates) |
| `github` | Optional URL → shows a "View on GitHub" button under the tabs |
| `summary` | List of text blocks; each has an optional `heading` + a list of `paragraphs` |
| `skills` | List of short tags shown as chips |
| `gallery` | List of media items (images/videos) with captions, in order |

### Adding a new project

1. Copy an entire `{ ... },` block from an existing project.
2. Paste it where you want it in the `PROJECTS` list.
3. Fill in your own `tab`, `title`, `subtitle`, `summary`, `skills`, and `gallery`.
4. Save, then refresh the browser.

To delete a project, remove its whole `{ ... },` block. (Keep a comma between blocks, and no trailing comma after the last block.)

### Adding sub-headers to a summary

Each entry in `summary` is a block. Give it a `heading` to show a sub-header, or leave `heading` as `""` for plain paragraphs:

```js
summary: [
  { heading: "", paragraphs: ["First paragraph.", "Second paragraph."] },
  { heading: "Logic and code", paragraphs: ["Text under this sub-header."] }
]
```

### Adding images and videos

1. Create a folder under `media/`, e.g. `media/my-project/`.
2. Put your files there.
3. Add entries to the project's `gallery` list, in the order you want:

```js
gallery: [
  { type: "image", src: "media/my-project/photo.jpg", caption: "My caption." },
  { type: "video", src: "media/my-project/demo.mp4",  caption: "A short demo." }
]
```

Media rules:
- Images must be **JPG, PNG, or WebP**. Apple `.HEIC` files will NOT show in a browser — convert them first (see below).
- Videos must be **MP4**, and should be small (a few MB) with **no audio** — the site treats them as muted. Convert/compress before uploading.

### Converting media (using ffmpeg)

If you have ffmpeg installed, run these from the project folder (Windows PowerShell).

Convert HEIC to JPG (two steps — HEIC photos are "tiled", so decode first, then resize):

```
ffmpeg -y -i "input.HEIC" -q:v 2 "full.jpg"
ffmpeg -y -i "full.jpg" -vf "scale='min(1600,iw)':-2" -q:v 3 "media/my-project/photo.jpg"
```

Compress a video (strip audio, downscale, shrink):

```
ffmpeg -y -i "input.mp4" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "media/my-project/demo.mp4"
```

## Changing the header / footer

- Header: edit the text inside `index.html` (the `<h1 class="site-title">` and `<p class="site-subtitle">`).
- Footer: edit the footer paragraph in `index.html`.

## Hosting on GitHub Pages

1. Create a new GitHub repository (e.g. named `PortfolioWebsite`).
2. Push this folder to it (commands below).
3. On GitHub, open the repo → **Settings** → **Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**, select **main** and **/ (root)**, then **Save**.
5. After a minute or so, your site is live at `https://<your-username>.github.io/<repo-name>/`.

First-time push commands:

```
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## File structure

```
index.html      – page shell (header, tabs, footer). Edit only for header/footer text.
styles.css      – all styling (light theme). You don't need to edit this.
content.js      – ★ YOUR CONTENT. Edit this to add/edit projects and media.
app.js          – rendering + tab/carousel behavior. You don't need to edit this.
media/          – images and videos used by your projects.
README.md       – this guide.
ARCHITECTURE.md – technical notes (for developers / future AI assistants).
.nojekyll       – tells GitHub Pages to serve files as-is.
```
