# Robo-Claude — Shot List

The site is built and looks polished **right now** with styled placeholders. Each
placeholder becomes a real image the moment you drop a correctly-named file into
`originals/` and run `./publish.sh`. Nothing else to edit.

## How to add a shot
1. Capture it (iPhone, screen recording, screenshot — whatever the row says).
2. Name the file **exactly** as in the "File" column and put it in `originals/`.
   (Capitals/spaces are fine — the build lowercases and hyphenates. But the
   *extension* must match: `.jpg` rows → a JPG/HEIC/PNG photo; `.png` rows → a screenshot.)
3. Run `./publish.sh`. The build resizes it (longest edge 2000px) into `media/` and it appears.

> Privacy: this is a public page. **Redact faces, email addresses, medical text,
> tokens and IP addresses** in any screenshot before it goes in. For the face
> section, prefer a shot of the *camera/enrolment UI* over an actual person.

---

## The shots

| # | File (put in `originals/`) | Where it appears | What to capture | Aspect | Min width |
|---|---|---|---|---|---|
| 01 | `hero.jpg` | Hero (top of page) | **✓ FILLED** with your desk shot — the robot beside the Mac running Claude Code (tells the whole story). Ideal future upgrade: the same scene with the **Claude avatar face** on the robot's screen. | 4:3 | 2000px |
| 02 | `device.jpg` | "What is an M5StackChan" | **✓ FILLED** with your marble close-up of the device. Optional extra: a true **teardown** shot (board/servos/screen laid out). | 4:3 | 1600px |
| 03 | `before-activation.jpg` | Freed → before | **✓ FILLED** with your `M5-2.png` (the factory face — perfect "before" evidence). Optional upgrade: the actual `激活设备` activation-lock screen. | 4:5 | 1600px |
| 04 | `flashing.jpg` | Freed → after | The reflash in progress — device on USB-C next to a terminal running `esptool`. | 4:3 | 1600px |
| 05 | `panel-overview.png` | Architecture | The **control panel** main "Robo-Control" tab at `http://127.0.0.1:8799`, live status showing. Screenshot. | 16:9 | 1800px |
| 06 | `voice-leds.jpg` | Subsystem A · Voice | Close-up of the robot mid-answer, **base LEDs glowing blue**. | 1:1 | 1400px |
| 07 | `doc-read.png` | Subsystem C · Documents | The Doc-Access tab, **or** a report on screen being read — redact all personal data. | 16:9 | 1800px |
| 08 | `hue-sonos.jpg` | Subsystem E · Home automation | Room shot: the robot with a **Hue lamp + Sonos speaker** it controls, evening light. | 16:9 | 1800px |
| 09 | `panel-watchers.png` | Subsystem G · Watchers | A watcher tab (News / Space / Sport) in the panel, showing followed items. | 16:9 | 1800px |
| 10 | `avatar-claude.jpg` | Subsystem I · Avatar | Screen close-up: the **Claude avatar face** filling the 2″ display. | 1:1 | 1400px |
| 11 | *(demo video)* | Hero "Watch the demo" button | 30–90s walkthrough: touch → ask → robot answers → controls a light. Upload to **YouTube/Vimeo**, then paste the ID into `app.js` (`VIDEO_ID`). | 16:9 | 1080p |
| — | `social-card.jpg` | Link previews (optional) | A framed hero-style image for when the link is shared (WhatsApp/iMessage/etc.). | 1.91:1 | 1200×630 |

## Nice-to-have extras (not wired in, but great to have)
- A short **GIF** of the head doing an idle glance.
- The **before/after firmware** side-by-side (factory smiley vs. Claude face).
- A wide **desk shot** of the whole setup: robot + Mac + panel on screen.

When you send me a batch, I'll place any extras into the layout and add captions.
