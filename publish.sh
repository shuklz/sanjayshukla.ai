#!/usr/bin/env bash
# publish.sh — the one button. Ingest new media, optimise it, commit, push.
# Re-running with nothing changed is a clean no-op.
#
#   ./publish.sh                 # commit message auto-generated
#   ./publish.sh "Add teardown"  # custom commit message
#
# Follows the house rules: never `git add .`; explicit list + `git add -u`;
# per-repo identity; no force push.
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-}"

# Per-repo identity (idempotent; no global config relied upon).
git config user.email shuklz@gmail.com
git config user.name  "Sanjay Shukla"

echo "→ optimising media…"
./build.sh

echo "→ staging…"
# Explicit list of everything we publish, then pick up edits to already-tracked files.
git add index.html styles.css app.js favicon.svg CNAME robots.txt .nojekyll \
        build.sh publish.sh UPDATE.md SHOTLIST.md CLAUDE.md 2>/dev/null || true
git add media/ 2>/dev/null || true
git add -u

if git diff --cached --quiet; then
  echo "✓ nothing to publish — already up to date."
  exit 0
fi

if [[ -z "$MSG" ]]; then MSG="Update site"; fi
git commit -q -m "$MSG"
echo "→ committed: $MSG"

# Push only if a remote/upstream is configured.
if git remote get-url origin >/dev/null 2>&1; then
  branch="$(git symbolic-ref --short HEAD)"
  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    git push
  else
    git push -u origin "$branch"
  fi
  echo "✓ pushed. GitHub Pages goes live in ~30s at https://sanjayshukla.ai/"
else
  cat <<'EOF'
✓ committed locally. No git remote yet — connect the GitHub repo once:

    git remote add origin https://github.com/shuklz/sanjayshukla.ai.git
    git push -u origin main

Then in the repo's Settings → Pages: Source = Deploy from branch → main (root),
Custom domain = sanjayshukla.ai. After that, ./publish.sh pushes on its own.
EOF
fi
