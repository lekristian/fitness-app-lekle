#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: npm run migrations <migration_name>"
  exit 1
fi

name="$1"
echo "Generating migration: $name"
npx sequelize-cli migration:generate --name "$name"
