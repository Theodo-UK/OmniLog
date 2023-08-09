#!/bin/bash

# CONNECTION_STRING="USER INPUT"
read -p "Enter connection string from the database (including password): " connection_string

# Create the .env file
echo "CONNECTION_STRING=$connection_string" > .env

npx prisma db push

echo "Tables successfully created in database."

echo "Deploying aws lambda with OpenNext and SST.."

npx sst deploy
