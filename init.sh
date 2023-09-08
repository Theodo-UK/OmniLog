#!/bin/bash

source ./scripts/create_env_file.sh

cd front || exit 1

read -rp "Enter your database URI (e.g. postgres://yourname:yourpassword@your-database.domain/path): " DATABASE_URI

read -rp "Enter your AWS profile name (see https://github.com/Theodo-UK/OmniLog/blob/main/docs/aws_setup.md if you have not set this up): " AWS_PROFILE_NAME
read -rp "Enter the AWS region you would like to deploy to: " AWS_REGION
read -rp "Enter a name to identify omnilog resources on your AWS (default: omnilog): " SST_STAGE_NAME
SST_STAGE_NAME=${SST_STAGE_NAME:-omnilog} # set SST_STAGE_NAME to omnilog if unset or empty
read -rp "Enter NEXTAUTH_SECRET (e.g. using openssl rand -hex 32): " NEXTAUTH_SECRET
read -rp "Enter the target URI where the omnilog web app will deploy: " NEXTAUTH_URL


# Create .env files
create_env_file ".env" "$DATABASE_URI"
create_env_file ".env.development" "$DATABASE_URI" "$AWS_PROFILE_NAME" "$AWS_REGION" "$SST_STAGE_NAME"
create_env_file ".env.production" "$DATABASE_URI" "$AWS_PROFILE_NAME" "$AWS_REGION" "$SST_STAGE_NAME" "$NEXTAUTH_SECRET" "$NEXTAUTH_URL"

yarn

yarn prisma db push --skip-generate

echo "Tables successfully created in database."

echo "Installing dependencies for web app..."

echo "Deploying web app..."

yarn deploy