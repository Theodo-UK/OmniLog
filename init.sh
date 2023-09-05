#!/bin/bash

# CONNECTION_STRING="USER INPUT"
read -rp "Enter connection string from the database (including password): " connection_string

source ./create_user.sh

# Get the current working directory
current_dir=$(pwd)

# Move into the front directory
cd front || exit 1

# Create the .env file
echo "DATABASE_URL=${connection_string}?pgbouncer=true" > .env

npx prisma db push

echo "Tables successfully created in database."

echo "Deploying aws lambda with OpenNext and SST.."

npx sst deploy

# Return to the original directory
cd "$current_dir" || exit 1
