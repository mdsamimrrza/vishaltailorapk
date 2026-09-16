#!/usr/bin/env bash
# Upload the built AAB + APK to a GitHub Release using the REST API.
# No `gh` CLI required — only curl, which ships with Git for Windows.
#
# Usage:
#   export GITHUB_REPO="owner/repo"
#   export GITHUB_TOKEN="ghp_xxx"        # needs 'repo' scope (classic PAT)
#   ./scripts/release-github.sh
#
# Optional overrides:
#   TAG="v1.0.0"          # default: v<version from app.json>
#   RELEASE_NAME="..."    # default: same as TAG
#   DRAFT=true            # default: false
#   PRERELEASE=false      # default: false

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

: "${GITHUB_REPO:?Set GITHUB_REPO, e.g. export GITHUB_REPO=\"owner/repo\"}"
: "${GITHUB_TOKEN:?Set GITHUB_TOKEN, a GitHub PAT with 'repo' scope}"

AAB="android/app/build/outputs/bundle/release/app-release.aab"
APK="android/app/build/outputs/apk/release/app-arm64-v8a-release.apk"

for f in "$AAB" "$APK"; do
  if [ ! -f "$f" ]; then
    echo "Missing build artifact: $f" >&2
    echo "Run the release build first (see README / build-log.txt)." >&2
    exit 1
  fi
done

VERSION="$(node -e "console.log(require('./app.json').expo.version)")"
TAG="${TAG:-v$VERSION}"
RELEASE_NAME="${RELEASE_NAME:-$TAG}"
DRAFT="${DRAFT:-false}"
PRERELEASE="${PRERELEASE:-false}"

API="https://api.github.com/repos/$GITHUB_REPO"
AUTH=(-H "Authorization: Bearer $GITHUB_TOKEN"
      -H "Accept: application/vnd.github+json"
      -H "X-GitHub-Api-Version: 2022-11-28")

echo "Repo:    $GITHUB_REPO"
echo "Tag:     $TAG"
echo "AAB:     $AAB ($(du -h "$AAB" | cut -f1))"
echo "APK:     $APK ($(du -h "$APK" | cut -f1))"
echo

# 1. Create the release (or reuse it if the tag already has one).
echo "Creating release $TAG ..."
RELEASE_JSON="$(curl -sS -X POST "$API/releases" "${AUTH[@]}" \
  -d "$(node -e '
    const [tag,name,draft,pre] = process.argv.slice(1);
    console.log(JSON.stringify({tag_name:tag,name,draft:draft==="true",prerelease:pre==="true",generate_release_notes:true}))
  ' "$TAG" "$RELEASE_NAME" "$DRAFT" "$PRERELEASE")")"

RELEASE_ID="$(node -e "try{console.log(JSON.parse(process.argv[1]).id)}catch(e){process.exit(1)}" "$RELEASE_JSON" 2>/dev/null || true)"

if [ -z "${RELEASE_ID:-}" ]; then
  echo "Create failed, checking for an existing release on $TAG ..."
  RELEASE_JSON="$(curl -sS "$API/releases/tags/$TAG" "${AUTH[@]}")"
  RELEASE_ID="$(node -e "const r=JSON.parse(process.argv[1]); if(!r.id){console.error(r.message||'no release');process.exit(1)} console.log(r.id)" "$RELEASE_JSON")"
fi
echo "Release id: $RELEASE_ID"

# 2. Upload each asset. Re-uploads replace an existing asset of the same name.
upload() {
  local file="$1" name
  name="$(basename "$file")"
  echo "Uploading $name ..."

  # Delete an existing asset with the same name so the upload doesn't 422.
  local existing
  existing="$(curl -sS "$API/releases/$RELEASE_ID/assets" "${AUTH[@]}" \
    | node -e "const a=JSON.parse(require('fs').readFileSync(0,'utf8'));const m=a.find(x=>x.name===process.argv[1]);if(m)console.log(m.id)" "$name" || true)"
  if [ -n "${existing:-}" ]; then
    curl -sS -X DELETE "$API/releases/assets/$existing" "${AUTH[@]}" >/dev/null
  fi

  curl -sS --fail -X POST \
    "https://uploads.github.com/repos/$GITHUB_REPO/releases/$RELEASE_ID/assets?name=$name" \
    "${AUTH[@]}" -H "Content-Type: application/octet-stream" \
    --data-binary @"$file" >/dev/null
  echo "  done."
}

upload "$AAB"
upload "$APK"

echo
echo "Release published: https://github.com/$GITHUB_REPO/releases/tag/$TAG"