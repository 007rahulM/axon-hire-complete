#!/usr/bin/env bash
# scripts/push-wiki.sh
#
# Pushes the contents of the wiki/ directory to the GitHub Wiki
# of this repository.
#
# Usage:
#   1. Make sure the GitHub Wiki is enabled for this repo
#      (Settings → Features → check "Wikis")
#   2. Run: bash scripts/push-wiki.sh
#
# The script requires either:
#   - A GITHUB_TOKEN env variable with repo scope, OR
#   - Being logged in with `gh auth login`

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WIKI_SRC="$REPO_ROOT/wiki"
WIKI_REPO_URL="https://github.com/007rahulM/axon-hire-complete.wiki.git"
TMP_DIR="$(mktemp -d)"

echo "▶ Cloning wiki repository into $TMP_DIR ..."
if [ -n "$GITHUB_TOKEN" ]; then
  # Use token auth (CI / Copilot agent)
  git clone "https://x-token:${GITHUB_TOKEN}@github.com/007rahulM/axon-hire-complete.wiki.git" "$TMP_DIR/wiki"
else
  # Use default credentials (local dev with gh auth login)
  git clone "$WIKI_REPO_URL" "$TMP_DIR/wiki"
fi

echo "▶ Copying wiki pages ..."
cp -r "$WIKI_SRC"/. "$TMP_DIR/wiki/"

cd "$TMP_DIR/wiki"

if [ -n "$(git status --porcelain)" ]; then
  echo "▶ Committing changes ..."
  git add -A
  git commit -m "docs: update wiki $(date -u '+%Y-%m-%d')"
  echo "▶ Pushing to GitHub Wiki ..."
  git push origin HEAD
  echo "✅ Wiki updated successfully!"
else
  echo "✅ Wiki is already up to date. No changes to push."
fi

rm -rf "$TMP_DIR"
