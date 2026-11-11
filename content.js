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

     thumb    : optional. The "cover" used for this project's tile on the
                Homepage. Any gallery item can be used (it does NOT have to be
                the first one). Shape:
                  { type: "image" | "video", src: "...", position?: "center 80%" }
                Videos in tiles autoplay muted on an infinite loop with no
                controls, and are cropped to fill the square tile. `position`
                is an optional CSS object-position value that chooses which
                part of the media stays visible when cropped (default
                "center"). If `thumb` is omitted, the first gallery item is
                used; if there is no media at all, a typographic tile is shown.

     type     : optional. Set the "type" field to "grid" to render this panel
                as a card grid of smaller projects (no carousel or summary
                text). Grid projects fill in `items` below and omit gallery
                and skills.
                Set type: "home" (first project only) for the Homepage tab,
                which automatically grids every other project.
     items    : for grid projects only. List of small-project cards, each with:
                  { title, media?, text, skills?, github? }
                `media` is a list of images/videos shown in that card with
                left/right gallery arrows (arrows are hidden when there is
                only one item); it also accepts the older single
                `image` / `video` / `position` fields. The card media is
                cropped to fill; clicking anywhere on a card opens it in a
                larger, focused view with the full media, text and chips.
     downloads: optional. Files offered at the very bottom of a project page,
                each shown as a card with a small preview image:
                  { label, href, preview?, meta?, cta? }
                `href` gets the HTML `download` attribute, so clicking saves
                the file instead of opening it.

   IMPORTANT: images must be JPG/PNG/WebP (NOT .HEIC), and videos must be
   .mp4 (ideally small and with no audio track). See README.md for how to
   convert media.
   ========================================================================= */

const PROJECTS = [

  /* =====================================================================
     PROJECT 0 — Homepage
     ---------------------------------------------------------------------
     Always keep this first. It renders automatically: every other project
     (apart from the grid) appears under "Projects", and the grid project's
     cards appear under "Mini-projects". Thumbnails come from each project's
     `thumb` field.
     ===================================================================== */
  {
    type: "home",
    tab: "Homepage"
  },

  /* =====================================================================
     PROJECT 1 — Tactile racing game
     ===================================================================== */
  {
    tab: "Tactile racing game",
    title: "Two-player tactile stick-shift racing game",
    subtitle: "Engineering projects class at CU Boulder (August – November 2025)",
    github: "https://github.com/Ignacioready13/Mach-5",

    thumb: { type: "image", src: "media/racing-game/full-view.jpg" },

    skills: ["Arduino", "C++", "Embedded systems"],

    gallery: [
      { type: "video", src: "media/racing-game/racing-demo.mp4",     caption: "Two playthroughs of the final game. Blue Player 'burns out' their car late in the second game (by skipping a gear)." },
      { type: "image", src: "media/racing-game/full-view.jpg",       caption: "The final project, seen with two controllers connected and the game ready to play. Note the two dials indicating RPM and the two NeoPixel strips (unlit in this photo) to indicate car distance along the track." },
      { type: "image", src: "media/racing-game/prototype.jpg",       caption: "An early prototype, featuring only one controller and rudimentary dial. Notice the limit switches are glued to the top of the controller before the design was modified to accommodate the switches internally" },
      { type: "image", src: "media/racing-game/wiring-topdown.jpg",  caption: "The final design, shown with all the wiring exposed. Notice the 4xAA pack used to power the servos separately, and the breadboard featuring two LEDs to indicate to each player when they stall their car." },
      { type: "image", src: "media/racing-game/wiring-closeup.jpg",  caption: "Our prototype needed a second breadboard to keep the LEDs visible." }
    ]
  },

   /* =====================================================================
     PROJECT idk — Calculator on FPGA
     ===================================================================== */
  {
    tab: "Calculator on FPGA",
    title: "Four-operation calculator for FPGA (SystemVerilog)",
    github: "https://github.com/Ignacioready13/Calculator",
    skills: ["SystemVerilog", "FPGA", "Vivado", "Digital Logic"],

    thumb: { type: "video", src: "media/calculator/calculatorShort.mp4" },
    
    gallery: [
      { type: "video", src: "media/calculator/calculatorFull.mp4", caption: "My calculator code on a Boolean Board (Spartan-7 FPGA), showcasing four basic math operations." },
      { type: "image", src: "media/calculator/IO_diagram.jpg", caption: "IO diagram showing the 5 modules."}
    ]
  },

 /* =====================================================================
     PROJECT 3 — RF Research
     ===================================================================== */
  {
    tab: "RF research",
    title: "Satellite GPS-jamming simulations",

    thumb: { type: "video", src: "media/rf/nlls-3d-satellite-solve.mp4", position: "65% center" },

    skills: ["#"],

    gallery: [
      { type: "video", src: "media/rf/nlls-3d-satellite-solve.mp4", caption: "Illustration of a 3D adaptation to a NLLS algorithm converging on a position solution (ignore the correlation marking)" },
      { type: "image", src: "media/rf/tdoa-matching-poland.jpg", caption: "TDOA ephemeris-matching results: each satellite's own PRN code ranks as first candidate." }
    ],

    downloads: [
      {
        label: "TDOA / NLLS research presentation",
        href: "media/rf/tdoa-research.pdf",
        preview: "media/rf/tdoa-nlls-preview.jpg",
        meta: "PDF · 33 slides · 4.2 MB"
      }
    ]
  },
  /* =====================================================================
     PROJECT 4 — VEX code
     ===================================================================== */
  {
    tab: "VEX code",
    title: "VEX autonomous & control code for 23-24 'Over Under' challenge",
    subtitle: "",
    github: "https://github.com/Ignacioready13/VEX-OverUnder-2654H",
    skills: ["#"],

    thumb: { type: "video", src: "media/vex/auton-run-square.mp4" },

    gallery: [
      { type: "video", src: "media/vex/auton-run.mp4", caption: "One of my autonomous routines. No auton recorder or anything fancy." }
    ]
  },
   /* =====================================================================
     PROJECT idk — neural game engine
     ===================================================================== */
  {
    tab: "Neural game engine",
    title: "Neural game engine",
    github: "https://github.com/Ignacioready13/Neural-Game-Engine",
    skills: ["#"],

    thumb: { type: "video", src: "media/neuralGameEngine/demo.mp4" },

    gallery: [
      { type: "video", src: "media/neuralGameEngine/demo.mp4", caption: "Model flow96e." },

    ]
  },
  /* =====================================================================
     PROJECT — guitar
     ===================================================================== */
  {
    tab: "Guitar restoration",
    title: "Guitar rewiring, modding, and restoration",
    subtitle: "Personal project",

    // Tall vertical video; the tile crops to the glowing body.
    thumb: { type: "video", src: "media/guitar/guitarWorkingVideo.mp4", position: "center 80%" },

    skills: ["#"],

    gallery: [
      { type: "video", src: "media/guitar/guitarWorkingVideo.mp4",       caption: "" },
      { type: "image", src: "media/guitar/guitarElectronics.jpg",  caption: "" },
      { type: "image", src: "media/guitar/guitarWiringClean.png",  caption: "" },
      { type: "image", src: "media/guitar/guitarBefore.png",       caption: "" },
      { type: "image", src: "media/guitar/guitarTrace.png",       caption: "" }
      
    ]
  },

  /* =====================================================================
     PROJECT 5 — Mini-projects (grid)
     ---------------------------------------------------------------------
     A "grid" project renders as a card grid instead of a carousel. Each
     card is { title, media?, text, skills?, github? }; `media` is a list of
     images/videos shown with gallery arrows, and clicking the card opens a
     larger, focused copy of it. These cards also appear on the Homepage
     under "Mini-projects"; clicking one there jumps to this tab and
     highlights the matching card.
     ===================================================================== */

  {
    type: "grid",
    tab: "Mini-projects",
    title: "Mini-projects",
    subtitle: "Smaller projects and experiments, in brief.",

    items: [
      {
        title: "Revived 3d printer",
        media: [
          { type: "image", src: "media/more/FrankensteinPrinter.png" }
        ],
        text: "Successfully revived dead 3D printer: debugged misbehaving extruder motor, swapped in mismatched Anet A8 board, reconfigured & re-flashed Marlin firmware to accommodate smaller axes & unheated bed.",
        //skills: ["Skill", "Skill", "Skill"]
        //github: "https://github.com/yourname/example-one"
      },
      {
        title: "Compact phone & SDR mount",
        media: [
          { type: "image", src: "media/mount/mountCadViewTwo.png", caption: "The phone mount as seen from the back; empty cavity for SDR frontend facing up, with hooks available to secure SDR with Velcro." },
          { type: "image", src: "media/mount/mount_2phones.jpg", caption: "Two 3d-printed mounts in the lab; each module holds together a phone, an SDR frontend and a UWB antenna." },
          { type: "image", src: "media/mount/mountCadViewOne.png", caption: "View of the adjustable clamp mechanism." }
        ],
        text: "A 3D-printed mount that holds an Android phone, an SDR transceiver, and a biconical UWB antenna together for field testing. The clamp is held shut on the phone with rubber bands, while the SDR velcros to the back. Designed in Onshape."
      },
      {
        title: "Roblox video game",
        media: [
          {
            type: "video",
            src: "media/roblox/new.mp4",
            position: "30% center",
            caption: "A Roblox ViewportFrame is usually meant to render a single 3d object; it was never meant to simulate an entire 3D world. By moving the player's character but leaving their camera in front of the Viewport, and linking their actions to a clone of their player rig within the Viewport environment, I can create an effect of a pixelated, scaled-down mini-world."
          }
        ],
        text: "A Roblox game I worked on for a couple of years in high school. The clip shows a viewport trick: the player's character moves while the camera stays in front of the ViewportFrame, so a mirrored rig inside the viewport renders a pixelated, scaled-down mini-world instead of a single 3D object."
      }
    ]
  }

];
