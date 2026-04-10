#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Em-dash / en-dash gate
# Fails with non-zero exit if any git-tracked, user-facing content contains:
#   U+2014  EM DASH  (—)
#   U+2013  EN DASH  (–)
#
# Uses git ls-files so only version-controlled files are scanned.
# Editorial rule: ZERO em/en dashes in production text.
# ---------------------------------------------------------------------------
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# The actual characters we're hunting (embedded literally so grep/rg can match)
EM_DASH=$'\xe2\x80\x94'   # U+2014
EN_DASH=$'\xe2\x80\x93'   # U+2013
PATTERN="[${EM_DASH}${EN_DASH}]"

# This script's own path (it must contain the dash characters to detect them)
SELF_REL="scripts/check-em-dashes.sh"

# ---- build file list from git-tracked files ------------------------------

files=()

while IFS= read -r f; do
  # Skip empty lines
  [[ -z "$f" ]] && continue

  # Exclude this script itself
  [[ "$f" == "$SELF_REL" ]] && continue

  # Exclude lock files
  case "$(basename "$f")" in
    package-lock.json|pnpm-lock.yaml|yarn.lock) continue ;;
  esac

  # EXCEPTION: legal/, terms/, privacy/ directories may legitimately use
  # em dashes (e.g. French legal conventions). These are excluded from the gate.
  case "$f" in
    legal/*|terms/*|privacy/*) continue ;;
  esac

  # Filter to in-scope extensions and paths:
  #   - messages/en.json, messages/fr.json
  #   - *.md in repo root and docs/
  #   - *.mdx anywhere
  #   - *.tsx, *.jsx in app/ and components/
  case "$f" in
    messages/en.json|messages/fr.json)
      files+=("$f") ;;
    *.mdx)
      files+=("$f") ;;
    *.md)
      # Only root-level .md and docs/**/*.md
      case "$f" in
        */*)
          # Has a directory — only include if under docs/
          case "$f" in
            docs/*) files+=("$f") ;;
            content/*) files+=("$f") ;;
          esac
          ;;
        *)
          # Root-level .md
          files+=("$f") ;;
      esac
      ;;
    app/*.tsx|app/*.jsx|components/*.tsx|components/*.jsx)
      files+=("$f") ;;
  esac
done < <(git ls-files)

# ---- scan ----------------------------------------------------------------

if [[ ${#files[@]} -eq 0 ]]; then
  echo "Em dash gate: no in-scope files found to scan."
  exit 0
fi

violations=0
violating_files=0

for f in "${files[@]}"; do
  file_hits=0
  while IFS= read -r line; do
    violations=$((violations + 1))
    file_hits=$((file_hits + 1))
    echo "$line"
  done < <(grep -n "$PATTERN" "$f" 2>/dev/null | sed "s|^|$f:|")
  if [[ $file_hits -gt 0 ]]; then
    violating_files=$((violating_files + 1))
  fi
done

# ---- report --------------------------------------------------------------

echo ""
if [[ $violations -gt 0 ]]; then
  echo "FAIL: $violations em/en dash(es) found in $violating_files file(s)."
  echo "Editorial rule: zero em dashes (U+2014) or en dashes (U+2013) in production text."
  exit 1
else
  echo "Em dash gate: clean."
  exit 0
fi
