# sanjayshukla.ai

Personal portfolio / showcase site for Sanjay Shukla's AI projects — the things he
is building and using, all running **locally**. This file captures the **intent**
of the site. It is a planning document only; **no build has started yet**.

> Status: **BUILT & PUBLISHED — Robo-Claude showcase.** Live build began 2026-09-17;
> site scaffolded, Robo-Claude deep-dive complete, pushed to GitHub Pages.
> (Intent first noted 2026-09-01.) See **AS BUILT** at the bottom of this file.

---

## Goal

A polished, **detailed showcase** site built for **demonstration** — Sanjay should
be able to walk someone through these projects and have them land nicely. Not a
plain list: each project gets a rich, self-contained showcase that *shows off* the
work. It lists and details the AI projects he is building (with Claude) and running
locally, explaining *what it is*, *why it exists*, *how it works*, its *current
status*, and *what's next*. The emphasis throughout is on **local-first, private,
no-cloud-lock-in** tooling.

Audience: a showcase for demonstrating to others (as well as a personal reference).
Tone: builder's log meets portfolio — concrete, honest about WIP status,
technically credible, and **visually compelling** so each project demos well.

### What "demonstrate nicely" implies for the build
- **Depth per project** — a dedicated detail page/section, not just a card: the
  story, architecture/how-it-works, screenshots or video, key features, stack, and
  live status.
- **Show, don't tell** — lean on media: screenshots, short demo clips/GIFs,
  diagrams, and (where possible) example outputs so a viewer *gets it* fast.
  **Sanjay provides all screenshots / demo videos**, captured **under Claude's
  guidance** — at build time Claude produces a per-project **shot list** (what to
  capture, framing, resolution/aspect, sequence) so the media fits the layout.
- **Demo-ready flow** — easy to present live: clear navigation, a strong landing
  overview, and a logical order to walk through the four projects.
- **Polished visuals** — cohesive design, good typography, responsive; it should
  look impressive, reflecting the quality of the underlying work.

---

## The Projects

### 1. Robo-Claude — *WIP*
The M5 unit we took apart and customised into a **house robot for personal tasks**.
Hardware hacking + Claude-driven control. This is the flagship hardware project and
is a **work in progress** — the site should reflect its evolving state (build log,
photos, milestones, current capabilities vs. planned).

- Category: Hardware / robotics / home automation
- Status: WIP
- To gather later: hardware spec, teardown/customisation notes, control stack,
  task list it can/should handle, media (photos/video).

### 2. Digital Avatar Studio
A pipeline to convert a **script → digital avatar video** using a **synthetic voice**.
The output can be used as-is, or **blended with a presentation / screen recording**
(e.g. talking-head over slides or a screencast).

- Category: Media generation / content
- Status: (to confirm — capture stage)
- To gather later: the toolchain (TTS/voice, avatar generation, compositing),
  example outputs, intended use cases.

### 3. ChatWithDocs
Chat privately with a whole folder of documents (PDFs and `.txt`), answered by a
**local LLM running in LM Studio**. Nothing leaves the machine — no cloud APIs, no
keys, no telemetry. Every answer cites the source file and page.

- Source: `/Users/sanjay/Desktop/OFFLINE-WORK/ClaudeCowork/OFFICE-AUTOMATION/CHAT-WITH-DOCS`
- Category: Office automation / RAG / local LLM
- Stack: `pypdf` extraction · `sentence-transformers` (`BAAI/bge-small-en-v1.5`)
  embeddings · `faiss-cpu` flat cosine vector store · LM Studio OpenAI-compatible
  server (`localhost:1234`) · Streamlit chat UI with streaming + source citations.
  Plain, debuggable Python — **no LangChain / LlamaIndex**.
- Highlights: incremental indexing (mtime+size manifest, never re-embeds unchanged
  files), context-only answers with `[file p.X]` citations, attach-a-doc session
  mode, one-click `.command` / `.bat` launchers.
- Status: Working / in use.

### 4. LLM Web Search
A **local** AI app that gives your own LLM full, real-time **web access** — no
OpenAI keys, no cloud lock-in. Runs on LM Studio with a **pluggable MCP web backend**.

- Source: `/Users/sanjay/Desktop/OFFLINE-WORK/ClaudeCowork/OFFICE-AUTOMATION/LLM Web Search`
- Category: Office automation / agentic web / local LLM
- Stack: Streamlit GUI · MCP web backends (**DuckDuckGo** free default via `uvx`,
  **Bright Data** heavy-duty via `npx`) · LangChain MCP adapters · LM Studio local LLM.
- Highlights: "search → then actually read the top pages" grounding, per-backend
  URL-aware tool routing (reddit/linkedin/amazon), live "thinking aloud" panel for
  reasoning models, persistent multi-turn history, copy/share to `.md` / PDF.
- Status: Working / in use. (Adapted from Mariya Sha's "Build AI App with FULL WEB
  ACCESS" tutorial, Ollama → LM Studio, with selectable backends.)

---

## Cross-cutting theme

All projects share a **local-first, privacy-preserving** philosophy: LM Studio for
local inference, no cloud APIs where avoidable, self-contained one-click launch.
The site should surface this as a through-line.

---

## Hosting, repo & publish routine

**GitHub repo (commit/posting):** `https://github.com/shuklz/sanjayshukla.ai`

**Hosting/deploy: follow the same concept/flows/routines as the sister sites**
`sanjayshukla.art` and `shuklz360`. The **`sanjayshukla.art` pattern is the chosen
analog** (closest fit — personal domain, static, GitHub Pages):

- **Static site on GitHub Pages** — served from `main` branch root, custom domain
  `sanjayshukla.ai` set via a **`CNAME`** file, TLS auto-provisioned. Push to
  `main` → live in ~30s. (Alternative on the table: Cloudflare Pages, per the
  `shuklz360` pattern — decide at build time; see open decisions.)
- **Source → build → committed output.** Raw media lives in a local, gitignored
  input folder (`.art` uses `originals/`); a **`build.sh`** converts/optimises it
  (macOS `sips` for images) into a committed output folder; HTML source lives under
  `_src/`.
- **One-button `publish.sh`** — ingest new media, append/update content, run the
  build, (optionally encrypt), commit, and `git push`. Re-running with nothing new
  is a clean no-op. This is the daily driver; avoid manual `git push`.
- **Optional password gate** via **Staticrypt** (encrypts `_src/*.html` →
  `index.html`; `.password` kept local, gitignored) — used on `.art` to keep the
  site off Google and out of casual hands. **Decide whether `.ai` is public
  (better for demoing to others) or gated** (see open decisions).
- **Two docs, two audiences** — `CLAUDE.md` (this file, for Claude) and an
  **`UPDATE.md`** plain-English manual for Sanjay (day-to-day: add a project,
  publish, change password, troubleshoot). `robots.txt` to control indexing.
- Two-Mac workflow (Mac Studio + MacBook Pro) stays in sync through GitHub —
  `git pull` first on whichever machine you sit down at.

> Media caveat to resolve at build time: this site wants **demo videos**, which are
> large. GitHub Pages has file/repo size limits — plan for external video hosting
> (e.g. YouTube/Vimeo embeds or Cloudflare Stream) rather than committing big
> `.mp4`s, or lean toward Cloudflare Pages. Decide when we scope the media.

### Local reference sources (read these before building)
Both sister projects are cloned locally; **their `CLAUDE.md`/`claude.md` are the
authoritative playbooks** — read them first when we build:
- `/Users/sanjay/Desktop/OFFLINE-WORK/ClaudeCowork/PERSONAL/Sites/sanjayshukla.art/claude.md`
  — the GitHub Pages pattern (`build.sh` + `publish.sh` + Staticrypt), plus `UPDATE.md`.
- `/Users/sanjay/Desktop/OFFLINE-WORK/ClaudeCowork/PERSONAL/Sites/shuklz360.com/CLAUDE.md`
  — the Cloudflare Pages pattern (Functions password middleware, Python `build/` →
  `public/`, media pushed via `wrangler pages deploy` and **kept out of git**).

### Leaning (given this site wants demo videos)
Because demo videos are large and awkward to commit, **the `shuklz360` Cloudflare
Pages model is the stronger technical fit** than `.art`'s commit-everything GitHub
Pages model: deploy media via `wrangler pages deploy` (direct upload, not in git),
keeping the repo small — or host video externally (YouTube/Vimeo/Cloudflare Stream)
and embed. Not locked; see Open decisions. (If the site ends up light on video and
heavy on screenshots, `.art`'s simpler GitHub Pages flow is fine.)

### Conventions to inherit from the sister sites (apply at build time)
- **Vanilla HTML/CSS/JS, no framework.** No Vite/Webpack/Next/React/Tailwind. The
  only "build step" is a shell/Python script (image/media optimise + deploy).
- **Per-repo git identity** — `git config user.email shuklz@gmail.com` and
  `user.name "Sanjay Shukla"`; not tied to a global config.
- **Never `git add .`** — stage an explicit file list plus `git add -u`, so
  local-only inputs (raw media, `.password`) never leak even with a `.gitignore` typo.
- **No `git push --force`** — the host serves whatever's on `main`.
- **kebab-case lowercase** asset filenames — Pages URLs are case-sensitive even on
  macOS; convert source names in the build.
- **Cache-bust** CSS/JS with `?v=N`, bumped on change (Pages caches ~10 min).
- **`noindex` / `robots.txt`** to control search visibility (both sisters stay
  unindexed; decide per the public-vs-gated call).
- **One-button publish script** (`publish.sh`) = ingest → build → commit → (deploy)
  → push; safe no-op when nothing changed. Written for Sanjay to run daily.
- **Two audience docs** — `CLAUDE.md` (Claude) + `UPDATE.md` (plain-English manual
  for Sanjay: add a project, publish, troubleshoot).
- **Local preview:** `python3 -m http.server 8765` (from the served folder).
- **Tooling on the sister-site Mac:** `sips` (built-in, image convert), Node via
  official `.pkg` (**no Homebrew** — don't suggest `brew install`), `npx wrangler`
  (never `npm -g`; `/usr/local` is root-owned). `gh` CLI **is** available in this
  environment (used to inspect the repos).
- **DNS/TLS gotcha to remember:** on `.art`, an orphaned DNSSEC **DS record** after
  a nameserver switch silently blocked the Let's Encrypt cert (SERVFAIL to
  validating resolvers while browsers still resolved). Check with
  `dig @8.8.8.8 <domain> A | grep status:` — `SERVFAIL` = broken chain. Watch for
  the same when wiring `sanjayshukla.ai`'s DNS.

## Open decisions (resolve at build time)

- **Host:** GitHub Pages (`.art` pattern) vs. Cloudflare Pages (`shuklz360`).
- **Access:** public (best for demonstrating to others) vs. Staticrypt password gate.
- **Video hosting:** external embeds vs. self-hosted — driven by the host's size limits.
- **Site stack:** hand-authored static HTML/CSS/JS (like `.art`) vs. a framework.

## Next steps (not yet started)

1. Lock the open decisions above (host, access, video hosting, stack).
2. Scaffold the repo to match the chosen sister-site pattern (`CNAME`,
   `build.sh`/`publish.sh`, `_src/`, `UPDATE.md`, `robots.txt`, `.gitignore`).
3. Design: layout, navigation, per-project detail template.
4. Populate content — pull real detail (and media) for Robo-Claude and Digital
   Avatar Studio; summarise ChatWithDocs & LLM Web Search from their READMEs.
5. Produce the per-project **shot list** so Sanjay captures the right media.
6. Build, publish to `sanjayshukla.ai`, verify live.

---

## AS BUILT — 2026-09-17 (Robo-Claude showcase)

**Open decisions — resolved:**
- **Scope:** Single-project deep-dive first. The site is a cinematic Robo-Claude
  showcase; the other three projects live in a left **“AI Projects”** rail marked
  *Coming soon* (Robo-Claude = *Built · live*).
- **Host:** GitHub Pages (the `.art` pattern) — **public** repo, `main` root, custom
  domain via `CNAME`.
- **Access:** Public, but **noindex** (`robots.txt` `Disallow: /` + meta tag) until
  ready to be discoverable. To go search-visible: remove the noindex `<meta>` in
  `index.html` and flip `robots.txt` (documented in `UPDATE.md`).
- **Video:** **Self-hosted** (updated 2026-09-22) — local-first, no third-party embed.
  Raw clip lives in `originals/` (gitignored); `build.sh` encodes it to a lean
  `media/robo-claude-demo.mp4` (+ poster) that ships in-repo. `app.js` `VIDEO_FILE`
  plays it in the modal. YouTube/Vimeo (`VIDEO_ID`) still supported as a fallback.
- **Stack:** Hand-authored **vanilla HTML/CSS/JS**, no framework. Only “build” is
  `build.sh` (macOS `sips` image optimise + `ffmpeg` video encode, both guarded;
  never upscales; kebab-cases names).

**Directory structure:**
```
sanjayshukla.ai/
  index.html      hand-authored single page (the showcase)
  styles.css      design system (dark + gold family; bump ?v=N to cache-bust)
  app.js          rail drawer, scroll-reveal, active-section, video modal (self-hosted mp4)
  favicon.svg
  CNAME           sanjayshukla.ai
  robots.txt      Disallow: /  (noindex for now)
  .nojekyll       serve files verbatim (no Jekyll)
  build.sh        originals/ -> media/   (sips images + ffmpeg video -> mp4 + poster)
  publish.sh      build -> stage (explicit list + git add -u) -> commit -> push
  UPDATE.md       plain-English manual for Sanjay
  SHOTLIST.md     per-slot media capture guide
  media/          COMMITTED optimised images (hero.jpg, at-home-1/2.jpg, device.jpg, …)
                  + robo-claude-demo.mp4 (~8MB) + robo-claude-demo-poster.jpg
  originals/      GITIGNORED raw drops — photos AND raw video (robo-claude-demo.mov,
                  153MB) live here; build.sh turns them into the committed media/
```

**Page sections:** left AI-Projects rail + on-this-page nav · cinematic hero
(smaller "boxed" desk shot + a two-up at-home photo gallery; hero shot capped at
~820px, no longer full-bleed) · “What is an M5StackChan” (hardware) ·
“Open by design, local by choice” (open-source framing, before/after, stage
timeline) · architecture flow + ports · 11 subsystem cards · stack · status/roadmap.
Media slots degrade to styled placeholders until real files land in `originals/`.

**Wording note (important):** framed **fairly** — the robot is open-source and
Kickstarter-born, *built to be opened up*; the maker’s XiaoZhi/Qwen cloud is “a
perfectly good default, and entirely optional.” We exercised the freedom it invited
and ran it **on our own terms**. Do **not** revert to “hacked / freed from a locked
Chinese box” language.

**Publish routine (daily driver):**
```bash
cd .../Sites/sanjayshukla.ai
git pull                          # two-Mac: pull first
# drop captures into originals/ (names per SHOTLIST.md)
./publish.sh "commit message"     # build -> commit -> push; live in ~30s
```

**Repo / hosting:** `github.com/shuklz/sanjayshukla.ai` (**public**, like `.art`).
Pages served from `main` root; `CNAME` = `sanjayshukla.ai`. Per-repo git identity
`shuklz@gmail.com` / “Sanjay Shukla”.

**Remaining / next (Sanjay):**
1. **Media redo — partly done (2026-09-22).** Hero shot kept but shrunk to a boxed
   frame; added two fresh at-home photos (`media/at-home-1.jpg`, `at-home-2.jpg`) as
   a two-up gallery in the hero. Still wanted: better `device.jpg` /
   `before-activation.jpg` and SHOTLIST slots 04–11 (keep the same filenames so they
   drop straight in).
2. **Demo video — DONE & live (2026-09-22).** An 82s clip is self-hosted at
   `media/robo-claude-demo.mp4` (153MB `.mov` → ~8MB via `build.sh`/ffmpeg) and plays
   in the hero “Watch the demo” modal. To swap it: overwrite
   `originals/robo-claude-demo.mov` and `./publish.sh`. (Future nice-to-have: reshoot
   as the “Hey Robo-Claude, introduce yourself” birth/rebirth/developments arc,
   ending on a *live* action — turn on a Hue light — and a Hindi line for EN·हिंदी.)
3. Flip **noindex** when ready to be found on Google.

**Done since launch (2026-09-17):** DNS live (name.com — 4 apex `A` records →
185.199.108–111.153 + `www` CNAME → `shuklz.github.io`); site serving at
http://sanjayshukla.ai/; HTTPS cert auto-provisioning (turn on **Enforce HTTPS**
once issued).
