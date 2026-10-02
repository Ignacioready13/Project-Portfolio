/* =========================================================================
   CONTENT FILE — structure only (tabs / titles / links / media)
   -------------------------------------------------------------------------
   This file defines the PROJECTS array: one entry per project (one tab).

   The WRITTEN TEXT for each project no longer lives here. It lives in a
   Markdown file under the `markdown/` folder, named after the tab name
   (lowercase, spaces -> dashes). For example, the "Guitar restoration" tab
   maps to `markdown/guitar-restoration.md`.

   Workflow:
     1. Add/edit a { ... } block here (tab, title, subtitle, github, skills,
        gallery).
     2. Run:  python build.py
        This creates any missing markdown/*.md placeholder, and rebuilds
        content.text.js from all the markdown files.
     3. Write your headings/paragraphs in that .md file. Markdown formatting
        like **bold**, *italic*, `code`, [links](url), and - bullet lists is
        supported.
     4. Run `python build.py` again, then open/refresh index.html.

   Fields kept here (structural):
     tab      : short name shown on the tab. Also names the markdown file.
     title    : full project name shown at the top of the content.
     subtitle : optional one-line description (class / dates / context).
     github   : optional URL; if present, a "View on GitHub" button appears.
     skills   : list of short tags shown as chips.
     gallery  : list of media items in order. Each item is:
                  { type: "image", src: "...", caption: "..." }   OR
                  { type: "video", src: "...", caption: "..." }
                Put files in a folder under media/ and point src to it, e.g.
                "media/my-project/photo.jpg".

   IMPORTANT: images must be JPG/PNG/WebP (NOT .HEIC), and videos must be
   .mp4 (ideally small and with no audio track). See README.md for how to
   convert media.
   ========================================================================= */

const PROJECTS = [

  /* =====================================================================
     PROJECT 1 — Tactile racing game
     ===================================================================== */
  {
    tab: "Tactile racing game",
    title: "Two-player tactile stick-shift racing game",
    subtitle: "Engineering projects class at CU Boulder (August – November 2025)",
    github: "https://github.com/Ignacioready13/Mach-5",

    skills: ["Arduino", "C++", "Embedded systems"],

    gallery: [
      { type: "image", src: "media/racing-game/full-view.jpg",       caption: "The final project, seen with two controllers connected and the game ready to play. Note the two dials indicating RPM and the two NeoPixel strips (unlit in this photo) to indicate car distance along the track." },
      { type: "image", src: "media/racing-game/prototype.jpg",       caption: "An early prototype, featuring only one controller and rudimentary dial. Notice the limit switches are glued to the top of the controller before the design was modified to accommodate the switches internally" },
      { type: "image", src: "media/racing-game/wiring-topdown.jpg",  caption: "The final design, shown with all the wiring exposed. Notice the 4xAA pack used to power the servos separately, and the breadboard featuring two LEDs to indicate to each player when they stall their car." },
      { type: "video", src: "media/racing-game/racing-demo.mp4",     caption: "Two playthroughs of the final game. Blue Player 'burns out' their car late in the second game (by skipping a gear)." },
      { type: "image", src: "media/racing-game/wiring-closeup.jpg",  caption: "Our prototype needed a second breadboard to keep the LEDs visible." }
    ]
  },
   /* =====================================================================
     PROJECT 2 — guitar
     ===================================================================== */
  {
    tab: "Guitar restoration",
    title: "Guitar rewiring, modding, and restoration",
    subtitle: "Personal project",

    skills: ["#"],

    gallery: [
      { type: "video", src: "media/guitar/guitarWorkingVideo.mp4",       caption: "" },
      { type: "image", src: "media/guitar/guitarBefore.png",       caption: "" },
      { type: "image", src: "media/guitar/guitarTrace.png",       caption: "" },
      { type: "image", src: "media/guitar/guitarElectronics.jpg",  caption: "" },
      { type: "image", src: "media/guitar/guitarWiringClean.png",  caption: "" }
    ]
  },

 /* =====================================================================
     PROJECT 3 - SDR mount
     ===================================================================== */
  {
    tab: "SDR mount",
    title: "Compact phone and SDR hardware module",
    subtitle: "For RF lab",

    skills: ["#"],

    gallery: [
      { type: "image", src: "media/mount/mountCadViewOne.png", caption: "Placeholder image one." },
      { type: "image", src: "media/mount/mountCadViewTwo.png", caption: "Placeholder image two." },
      { type: "image", src: "media/mount/mount_2phones.jpg", caption: "Placeholder image three." }
    ]
  },
  /* =====================================================================
     PROJECT 4 — RF Research
     ===================================================================== */
  {
    tab: "RF research",
    title: "TDOA, NLLS",
    subtitle: "For lab",

    skills: ["#"],

    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  },
  /* =====================================================================
     PROJECT 5 — Video game
     ===================================================================== */
  {
    tab: "Video game",
    title: "Video game made in Roblox",
    subtitle: "",

    skills: ["#"],

    gallery: [
      { type: "video", src: "media/roblox/new.mp4", caption: "A Roblox ViewportFrame is usually meant to render a single 3d object; it was never meant to simulate an entire 3D world. By moving the player's character but leaving their camera in front of the Viewport, and linking their actions to a clone of their player rig within the Viewport environment, I can create an effect of a pixelated, scaled-down mini-world." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  },
  /* =====================================================================
     PROJECT 6 — placeholder
     ===================================================================== */
  {
    tab: "Placeholder",
    title: "",
    subtitle: "",

    skills: ["#"],

    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  }

];
