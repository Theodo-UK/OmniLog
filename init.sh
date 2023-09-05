#!/bin/bash

# CONNECTION_STRING="USER INPUT"
read -rp "Enter connection string from the database (including password): " connection_string

# Move into the front directory
cd front

# Create the .env file
echo "DATABASE_URL=$connection_string" > .env

npx prisma db push

echo "Tables successfully created in database."

echo "Deploying aws lambda with OpenNext and SST.."

npx sst deploy
