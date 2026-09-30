/* =========================================================================
   CONTENT FILE — EDIT THIS FILE TO MANAGE YOUR PORTFOLIO
   -------------------------------------------------------------------------
   Everything you need to change lives in this one file. You do NOT need to
   touch index.html, styles.css, or app.js.

   This file defines a JavaScript array called PROJECTS. Each entry in the
   array is one project (one tab). To add a project, copy an existing
   { ... } block (including the surrounding { } and the trailing comma) and
   fill in your own details.

   QUICK REFERENCE — what each field does:
     tab      : short name shown on the tab itself
     title    : full project name shown at the top of the tab's content
     subtitle : optional one-line description (class / dates / context)
     github   : optional URL; if present, a "View on GitHub" button appears
                right below the tabs. Delete this line to remove the button.
     summary  : list of text blocks. Each block has an optional "heading"
                (a sub-header) and a list of "paragraphs". Leave heading as
                "" (empty) for a plain intro paragraph with no header.
     skills   : list of short tags shown as chips.
     gallery  : list of media items in the order you want them. Each item is:
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

    summary: [
      {
        heading: "",
        paragraphs: [
          "Under my leadership, my GEEN 1400 projects team created a unique two-player racing game which features two tactile stick-shift models as controllers and RPM gauges instead of a screen.",
          "My team and I noticed the lack of affordable, user-friendly video-game-like experiences on the market, inspiring us to create a first-of-its-kind console that includes all the fun and none of the unnecessary complexity or expenses of a traditional video game console.",
          "The controllers are remixed from an existing 3d printable fidget-toy car shifter model, which I evolved into a functional and durable controller for our game. Our controller is modified to fit six limit switches, located carefully to be adequately sensitive to shifting motions but not overly fragile."
        ]
      },
      {
        heading: "Logic and code",
        paragraphs: [
          "Before writing code, we made a diagram of all possible inputs to outputs.",
          "I cleanly translated our I/O diagram into Arduino logic with an object-oriented coding approach. The Controller class defines variables which each Controller object needs to keep track of: current gear, its own full pinout, and the state of its corresponding LED. The broader Car class defines functions and variables for each player, as well as holding a reference to the corresponding Controller. The finished code was robust enough to keep track of all the necessary variables for each controller, NeoPixel strip, and servo, and carefully time the logical handling of all the inputs and outputs to create a fluid, enjoyable game experience."
        ]
      },
      {
        heading: "Wiring",
        paragraphs: [
          "I laid out the wiring in such a way to minimize unnecessary jumper cables and maximize organization in the case of malfunction, completely redoing the wiring several times to make it as failsafe and clean as possible."
        ]
      }
    ],

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

    summary: [
      {
        heading: "",
        paragraphs: [
          "Content coming soon" 
        ]
      },
      {
        heading: "Wiring",
        paragraphs: [
         
          "Content coming soon"
        ]
      },
      {
        heading: "Pickguard",
        paragraphs: [
          "Content coming soon"
        ]
      },
      {
        heading: "Lighting",
        paragraphs: [
          "Content coming soon"
        ]
      }
    ],

    skills: ["#"],

    gallery: [
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
    title: "SDR mount",
    subtitle: "For RF lab",

    summary: [
      {
        heading: "",
        paragraphs: [
          "Content coming soon" 
        ]
      },
      {
        heading: "Content coming soon",
        paragraphs: [
         
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      }
    ],

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

    summary: [
      {
        heading: "",
        paragraphs: [
          "Content coming soon" 
        ]
      },
      {
        heading: "Content coming soon",
        paragraphs: [
         
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      }
    ],

    skills: ["#"],

    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  },
  /* =====================================================================
     PROJECT # - placeholder
     ===================================================================== */
  {
    tab: "Video game",
    title: "Video game made in Roblox",
    subtitle: "",

    summary: [
      {
        heading: "",
        paragraphs: [
          "Content coming soon" 
        ]
      },
      {
        heading: "Content coming soon",
        paragraphs: [
         
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      }
    ],

    skills: ["#"],

    gallery: [
      { type: "video", src: "media/roblox/new.mp4", caption: "A Roblox ViewportFrame is usually meant to render a single 3d object; it was never meant to simulate an entire 3D world. By moving the player's character but leaving their camera in front of the Viewport, and linking their actions to a clone of their player rig within the Viewport environment, I can create an effect of a pixelated, scaled-down mini-world." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  },
  /* =====================================================================
     PROJECT # - placeholder
     ===================================================================== */
  {
    tab: "Placeholder",
    title: "",
    subtitle: "",

    summary: [
      {
        heading: "",
        paragraphs: [
          "Content coming soon" 
        ]
      },
      {
        heading: "Content coming soon",
        paragraphs: [
         
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      },
      {
        heading: "",
        paragraphs: [
          "Content coming soon"
        ]
      }
    ],

    skills: ["#"],

    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  },
  

];

