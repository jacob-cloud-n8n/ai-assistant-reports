#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ID="jacob-html-slides-2026"
DEPLOY_DIR="$SCRIPT_DIR/.firebase-deploy"

cd "$SCRIPT_DIR"

if ! command -v firebase >/dev/null 2>&1; then
  echo "Firebase CLI not found. Install firebase-tools before deploying." >&2
  exit 1
fi

mkdir -p "$DEPLOY_DIR"
if [[ "$DEPLOY_DIR" != "$SCRIPT_DIR/.firebase-deploy" ]]; then
  echo "Unexpected deploy directory: $DEPLOY_DIR" >&2
  exit 1
fi
find "$DEPLOY_DIR" -mindepth 1 -delete

rsync -a \
  --exclude='.*' \
  --exclude='/firebase.json' \
  --include='/course-docs/' \
  --include='/course-docs/**' \
  --include='*/' \
  --include='*.html' \
  --include='*.css' \
  --include='*.js' \
  --include='*.json' \
  --include='*.png' \
  --include='*.jpg' \
  --include='*.jpeg' \
  --include='*.webp' \
  --include='*.gif' \
  --include='*.svg' \
  --include='*.ico' \
  --exclude='*' \
  "$SCRIPT_DIR/" "$DEPLOY_DIR/"

FILE_COUNT="$(find "$DEPLOY_DIR" -type f | wc -l | tr -d ' ')"
if [[ "$FILE_COUNT" -lt 1 || "$FILE_COUNT" -gt 100 ]]; then
  echo "Refusing to deploy unexpected file count: $FILE_COUNT" >&2
  exit 1
fi

echo "Deploying $FILE_COUNT allowlisted files to Firebase project $PROJECT_ID"

set +e
DEPLOY_OUTPUT="$(firebase deploy \
  --config "$SCRIPT_DIR/firebase.json" \
  --project "$PROJECT_ID" \
  --only hosting \
  --non-interactive 2>&1)"
DEPLOY_STATUS=$?
set -e

printf '%s\n' "$DEPLOY_OUTPUT"

if [[ $DEPLOY_STATUS -ne 0 ]] || [[ "$DEPLOY_OUTPUT" == *"This tool has encountered an error"* ]]; then
  echo "Firebase deployment failed." >&2
  exit 1
fi

if [[ "$DEPLOY_OUTPUT" != *"Deploy complete"* ]]; then
  echo "Firebase CLI did not confirm a completed deployment." >&2
  exit 1
fi
