#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail() {
  echo "FAILED: $1 — $2"
  exit 1
}

# 1. Type check
out=$(npx tsc --noEmit 2>&1) || fail "typecheck" "$(echo "$out" | grep 'error TS' | head -3)"

# 2. Build
out=$(npm run build 2>&1) || {
  msg=$(echo "$out" | grep -E '^(Error|Failed|TypeError|Cannot)' | head -3)
  [[ -z "$msg" ]] && msg=$(echo "$out" | tail -3)
  fail "build" "$msg"
}

# 3. Security audit (high/critical only)
out=$(npm audit --audit-level=high --omit=dev 2>&1) || {
  pkgs=$(echo "$out" | awk '/Severity: (high|critical)/ {split(prev,a," "); printf "%s ", a[1]} {prev=$0}' | xargs)
  summary=$(echo "$out" | grep -oE '[0-9]+ (high|critical)' | tr '\n' ', ' | sed 's/, $//')
  moderate=$(echo "$out" | grep -oE '[0-9]+ moderate' | grep -oE '[0-9]+')
  extra=$([[ -n "$moderate" && "$moderate" -gt 0 ]] && echo " (+ ${moderate} moderate)" || echo "")
  fail "audit" "${summary} in: ${pkgs}${extra}"
}

echo "All tests passed."
