#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail() {
  echo "FAILED: $1 — $2"
  exit 1
}

# Bump package.json to latest versions
ncu_out=$(npx --yes npm-check-updates -u 2>&1) || fail "ncu" "$(echo "$ncu_out" | tail -3)"

updated=$(echo "$ncu_out" | grep -cE '→' || true)

if [[ "$updated" -eq 0 ]]; then
  echo "All packages up to date."
  exit 0
fi

# Install updated versions
install_out=$(npm install 2>&1) || fail "install" "$(echo "$install_out" | tail -3)"

echo "Updated: $updated package(s)."
