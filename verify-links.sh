#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_DIR="$SCRIPT_DIR/.firebase-deploy"
INDEX="$SCRIPT_DIR/index.html"

if [[ ! -f "$INDEX" ]]; then
  echo "❌ index.html not found in $SCRIPT_DIR" >&2
  exit 1
fi

# Extract all href values (internal links only)
LINKS=$(grep -oE 'href="[^"#]+"' "$INDEX" | sed 's/href="//;s/"//' | sort -u)

ERRORS=0
for link in $LINKS; do
  # Skip external URLs
  if [[ "$link" == http* ]]; then
    continue
  fi
  # URL decode
  DECODED=$(python3 -c "import urllib.parse,sys; print(urllib.parse.unquote(sys.argv[1]))" "$link" 2>/dev/null || echo "$link")
  TARGET="$DEPLOY_DIR/$DECODED"
  if [[ ! -f "$TARGET" ]]; then
    echo "❌ BROKEN LINK: $link → file not found: $DECODED"
    ERRORS=$((ERRORS + 1))
  else
    echo "✅ $link"
  fi
done

if [[ $ERRORS -gt 0 ]]; then
  echo ""
  echo "🚫 $ERRORS broken link(s) found. Deploy blocked." >&2
  exit 1
fi

echo ""
echo "🔗 All links verified. Ready to deploy."
