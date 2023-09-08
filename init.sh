#!/bin/bash
# Get the current working directory
current_dir=$(pwd)

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

echo "Installing dependencies for web app in $(pwd)"

yarn install

yarn prisma db push --skip-generate

echo "Tables successfully created in database."

read -rp "Would you like to create your user to log in to the web app now? (y/N): " CREATEUSER
if [[ $CREATEUSER =~ ^[Yy]$ ]]; then
  source ./create_user.sh
else
  echo "Skipping user creation..."
fi

echo "Deploying web app..."


yarn deploy

# Return to the original directory
cd "$current_dir" || exit 1