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
  {
    tab: "Guitar restoration",
    title: "Guitar rewiring, modding, and restoration",
    subtitle: "Engineering projects class at CU Boulder (August – November 2025)",

    summary: [
      {
        heading: "",
        paragraphs: [
          "During my senior year of high school, some family friends gave me a very broken electric guitar. The headstock was cracked clean in half. The pickguard was shattered and filthy. And it didn’t make any noise at all.",
          "I took it apart just thinking I’d see what the circuitry of a guitar looked like; I didn’t think I had the bandwidth to actually fix it up. Upon further research, it was briefly made sometime in the 1960s by a now-defunct company, and had no documentation whatsoever. It really seemed like a lost cause. I took off the pickguard and cleaned everything up, just out of respect for and curiosity about the guitar. After spending increasingly long hours admiring its components, I figured I might as well just fix the thing." 
        ]
      },
      {
        heading: "Wiring",
        paragraphs: [
          "Before writing code, we made a diagram of all possible inputs to outputs.",
          "I cleanly translated our I/O diagram into Arduino logic with an object-oriented coding approach. The Controller class defines variables which each Controller object needs to keep track of: current gear, its own full pinout, and the state of its corresponding LED. The broader Car class defines functions and variables for each player, as well as holding a reference to the corresponding Controller. The finished code was robust enough to keep track of all the necessary variables for each controller, NeoPixel strip, and servo, and carefully time the logical handling of all the inputs and outputs to create a fluid, enjoyable game experience."
        ]
      },
      {
        heading: "Pickguard",
        paragraphs: [
          "I laid out the wiring in such a way to minimize unnecessary jumper cables and maximize organization in the case of malfunction, completely redoing the wiring several times to make it as failsafe and clean as possible."
        ]
      },
      {
        heading: "Lighting",
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
     PLACEHOLDER PROJECT — DELETE OR REPLACE THIS WHOLE BLOCK
     ===================================================================== */
  {
    tab: "Project two",
    title: "Placeholder project two",
    subtitle: "Replace this subtitle with your project's context.",
    summary: [
      {
        heading: "",
        paragraphs: [
          "This is a placeholder tab so you can see how multiple projects behave. Copy the structure of the first project (or this one) to add your real work, then delete the placeholders."
        ]
      },
      {
        heading: "An example sub-header",
        paragraphs: [
          "Sub-headers like this let you split a longer write-up into sections. Add as many blocks as you like."
        ]
      }
    ],
    skills: ["Skill A", "Skill B", "Skill C"],
    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." }
    ]
  },

  /* =====================================================================
     PLACEHOLDER PROJECT — DELETE OR REPLACE THIS WHOLE BLOCK
     ===================================================================== */
  {
    tab: "Project three",
    title: "Placeholder project three",
    subtitle: "Replace this subtitle with your project's context.",
    summary: [
      {
        heading: "",
        paragraphs: [
          "Another placeholder tab. Having three tabs lets you confirm the tab bar and carousel both work end-to-end before you replace them with real content."
        ]
      }
    ],
    skills: ["Skill X", "Skill Y"],
    gallery: [
      { type: "image", src: "media/placeholders/placeholder-1.svg", caption: "Placeholder image one." },
      { type: "image", src: "media/placeholders/placeholder-2.svg", caption: "Placeholder image two." },
      { type: "image", src: "media/placeholders/placeholder-3.svg", caption: "Placeholder image three." }
    ]
  }

];

