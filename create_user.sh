#!/bin/bash

echo "Enter details of user to be created."

read -rp "Enter user name: " name

# Email validation loop
while true; do
    read -rp "Enter user email: " email
    if [[ "$email" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$ ]]; then
        break
    else
        echo "Error: Invalid email format. Please enter a valid email address."
    fi
done

read -rp "Enter user password: " password

# Check all values are provided
if [ -z "$name" ] || [ -z "$email" ] || [ -z "$password" ]; then
    echo "Error: Please provide valid inputs for all fields."
    exit 1
fi
echo "create.sh pwd"

# Get the current working directory
current_dir=$(pwd)

# Move into the front directory
cd front || exit 1

yarn seed "$name" "$email" "$password"

# Return to the original directory
cd "$current_dir" || exit 1