#!/bin/bash

echo "Enter details of user to be created."

read -p "Enter user name: " name
read -p "Enter user email: " email
read -p "Enter user password: " password

# Input validation
if [ -z "$name" ] || [ -z "$email" ] || [ -z "$password" ]; then
    echo "Error: Please provide valid inputs for all fields."
    exit 1
fi

# Move into the front directory
cd front

yarn seed "$name" "$email" "$password"