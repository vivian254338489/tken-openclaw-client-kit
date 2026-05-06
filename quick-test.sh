#!/usr/bin/env sh
set -eu

: "${TKEN_BASE_URL:=https://www.tken.shop/v1}"
: "${TKEN_DEFAULT_MODEL:=tken-free-model}"

if [ -z "${TKEN_API_KEY:-}" ]; then
  echo "Set TKEN_API_KEY first." >&2
  exit 1
fi

curl "$TKEN_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $TKEN_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"model\": \"$TKEN_DEFAULT_MODEL\",
    \"messages\": [{\"role\":\"user\",\"content\":\"Reply with one short OpenClaw setup tip.\"}]
  }"
