# sanjayshukla.ai — the manual (for Sanjay)

Plain-English, no-jargon guide to running this site. It's the Robo-Claude
showcase, built the same way as **sanjayshukla.art**: hand-written HTML, a
`build.sh` that optimises photos, and a one-button `publish.sh`.

---

## The 10-second version

```bash
cd ~/…/Sites/sanjayshukla.ai
./publish.sh          # optimise media, commit, push. Live in ~30s.
```

Everything else below is detail.

---

## See it before it's live (local preview)

```bash
cd ~/…/Sites/sanjayshukla.ai
python3 -m http.server 8765
# then open http://localhost:8765 in a browser
```
Change a file, refresh the browser. When it looks right, publish.

---

## Add photos / screenshots

1. Open **`SHOTLIST.md`** — it lists every image slot and the exact filename to use.
2. Capture the shot, name the file to match (e.g. `hero.jpg`, `panel-overview.png`),
   drop it into the **`originals/`** folder.
3. `./publish.sh`. The placeholder turns into your image automatically.

> `originals/` never leaves your Mac (it's gitignored). The optimised copy in
> `media/` is what actually ships. **Redact anything private in screenshots first** —
> this page is public.

## Add / replace the demo video (self-hosted — no YouTube needed)

The site plays its own clip — no third-party embed, in keeping with the
local-first theme.

1. Record the clip (phone/screen-record is fine). Drop the raw file into
   **`originals/`** named **`robo-claude-demo.mov`** (or `.mp4`). Big raw files are
   fine here — `originals/` never leaves your Mac.
2. `./publish.sh`. `build.sh` shrinks it to a lean, web-ready
   `media/robo-claude-demo.mp4` (+ a poster frame) and ships only that. The
   153 MB raw becomes ~8 MB. The "Watch the demo" button plays it in a pop-up.
3. If you re-record, overwrite the file in `originals/` and publish again — the
   encoder re-runs whenever the raw file is newer than the built `.mp4`.

> Encoding needs **ffmpeg** (already installed on this Mac). On a Mac without it,
> `build.sh` skips the video step and says so — the rest of the build still works.

**Prefer YouTube/Vimeo instead?** Open **`app.js`**, clear `VIDEO_FILE = ''`, set
`VIDEO_ID` (and `VIDEO_HOST` to `'youtube'`/`'vimeo'`), bump the `app.js` `?v=N` in
`index.html`, then `./publish.sh`.

## Change the words

All the copy lives in **`index.html`** — it's readable top-to-bottom, section by
section. Edit the text, save, `./publish.sh`. If you change `styles.css` or
`app.js`, bump their `?v=N` in `index.html` so browsers fetch the new version
(GitHub Pages caches for a few minutes).

---

## First-time setup (once per Mac)

The repo is already initialised. To connect it to GitHub and go live:

```bash
git remote add origin https://github.com/shuklz/sanjayshukla.ai.git
git push -u origin main
```

Then on GitHub → the repo → **Settings → Pages**:
- **Source:** Deploy from a branch → `main` → `/ (root)`
- **Custom domain:** `sanjayshukla.ai`  (the `CNAME` file is already in the repo)
- Tick **Enforce HTTPS** once the certificate is issued (can take a few minutes).

**DNS** at your registrar (apex domain → GitHub Pages):
```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```
(Optional `www`: `CNAME  www  shuklz.github.io`.)

After that, `./publish.sh` does everything on its own.

---

## Make it findable on Google (when you're ready)

Right now the site is **public but hidden from search** (good while you polish).
To let Google index it:
1. In `index.html`, delete the line: `<meta name="robots" content="noindex, nofollow">`
2. In `robots.txt`, change `Disallow: /` to `Allow: /`
3. `./publish.sh`.

---

## The two-Mac routine (Mac Studio + MacBook Pro)

Both machines sync through GitHub. **Whichever Mac you sit at, `git pull` first**,
then work, then `./publish.sh`. Never `git push --force` — GitHub Pages serves
whatever is on `main`.

---

## House rules baked into the scripts
- **Never `git add .`** — `publish.sh` stages an explicit list, so nothing private leaks.
- **Per-repo identity** — commits are as `Sanjay Shukla <shuklz@gmail.com>`.
- **Vanilla everything** — no Node build, no framework. Just files.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Image didn't appear | Filename must match `SHOTLIST.md` exactly; check it's in `originals/`; re-run `./publish.sh`. |
| Old CSS still showing | Bump `?v=N` on the `styles.css`/`app.js` link in `index.html`, publish, hard-refresh. |
| Site not updating | `git status` — did `publish.sh` push? GitHub Pages can take a minute. |
| HTTPS/cert stuck or "not secure" | Check DNS isn't broken by a stray **DNSSEC** record: `dig @8.8.8.8 sanjayshukla.ai A \| grep status:` — `SERVFAIL` means remove the orphaned DS record at the registrar. (This exact thing bit `.art`.) |
| `sips: command not found` | You're not on macOS. `build.sh` needs the built-in macOS `sips`. |
| Video didn't encode / update | Needs `ffmpeg`. Check the raw file is in `originals/` and newer than `media/robo-claude-demo.mp4`; re-run `./publish.sh`. |
