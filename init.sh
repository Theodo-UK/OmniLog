#!/bin/bash

source ./scripts/create_env_file.sh
source ./scripts/configure_env_files.sh

cd front || exit 1

if [[ -e .env || -e .env.development || -e .env.production ]]; then
  read -rp "Environment files exist. Do you want to reconfigure them? (y/N): " RECONFIGURE
  if [[ $RECONFIGURE =~ ^[Yy]$ ]]; then
    configure_env_files
  else
    echo "Skipping reconfiguration."
  fi
else
  configure_env_files
fi

yarn

yarn prisma db push --skip-generate

echo "Tables successfully created in database."

echo "Installing dependencies for web app..."

echo "Deploying web app..."

yarn deploy