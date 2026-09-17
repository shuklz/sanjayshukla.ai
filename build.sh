#!/usr/bin/env bash
# build.sh — optimise raw media from originals/ (gitignored) into media/ (committed).
# macOS only: uses the built-in `sips`. No Homebrew, no external deps.
#
#   originals/hero.jpg        ->  media/hero.jpg        (longest edge <= 2000px, q82)
#   originals/panel-main.png  ->  media/panel-main.png  (longest edge <= 2000px)
#   originals/Robot Front.HEIC->  media/robot-front.jpg (converted + resized)
#
# Name each file to match the slot it fills (see SHOTLIST.md). Re-running is a
# safe no-op: outputs newer than their source are skipped.
set -euo pipefail
cd "$(dirname "$0")"

SRC="originals"
OUT="media"
MAX=2000          # longest edge, px
JPG_Q=82          # jpeg quality

mkdir -p "$OUT"

if [[ ! -d "$SRC" ]] || [[ -z "$(ls -A "$SRC" 2>/dev/null | grep -viE '(^|/)\.' || true)" ]]; then
  echo "build: nothing in $SRC/ — drop your captures there (see SHOTLIST.md). Skipping media."
  exit 0
fi

# CamelCase / spaces -> kebab-case-lowercase (idempotent for already-kebab names)
kebab() {
  echo "$1" \
    | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' \
    | sed -E 's/[[:space:]_]+/-/g' \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/-+/-/g; s/^-|-$//g'
}

built=0; skipped=0
shopt -s nullglob nocaseglob
for src in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png "$SRC"/*.heic; do
  [[ -e "$src" ]] || continue
  base="$(basename "$src")"; stem="${base%.*}"; ext="${base##*.}"
  slug="$(kebab "$stem")"

  # PNG stays PNG (crisp UI text); everything else becomes JPG.
  shopt -s nocasematch
  if [[ "$ext" == "png" ]]; then outext="png"; else outext="jpg"; fi
  shopt -u nocasematch
  out="$OUT/$slug.$outext"

  if [[ -f "$out" && "$out" -nt "$src" ]]; then
    skipped=$((skipped+1)); continue
  fi

  # Never upscale: cap the longest edge at min(source, MAX).
  src_max="$(sips -g pixelWidth -g pixelHeight "$src" 2>/dev/null | awk '/pixelWidth:|pixelHeight:/{print $2}' | sort -rn | head -1)"
  target="$MAX"
  if [[ -n "$src_max" && "$src_max" =~ ^[0-9]+$ && "$src_max" -lt "$MAX" ]]; then target="$src_max"; fi

  if [[ "$outext" == "png" ]]; then
    sips -Z "$target" -s format png "$src" --out "$out" >/dev/null
  else
    sips -Z "$target" -s format jpeg -s formatOptions "$JPG_Q" "$src" --out "$out" >/dev/null
  fi
  printf '  + %s -> %s\n' "$base" "$out"
  built=$((built+1))
done
shopt -u nullglob nocaseglob

echo "build: $built optimised, $skipped up-to-date. Output in $OUT/"
