#!/usr/bin/env bash

project_path=$(pwd)

# cd to path of script for relative path resolution
script_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )
cd "$script_path" || exit 1

source ./source_if_file_exists.sh
source ./handle_errors.sh
source ./check_var.sh

ENV_FILE_NAME=".env.production"
source_if_file_exists "../$ENV_FILE_NAME"

check_var "AWS_REGION" "$ENV_FILE_NAME"
check_var "AWS_PROFILE_NAME" "$ENV_FILE_NAME"
check_var "SST_STAGE_NAME" "$ENV_FILE_NAME"

# cd back to root to run commands
cd "$project_path" || exit 1 

echo "Warning: You are about to remove the SST stack. This action is irreversible and will delete all the resources managed by the stack."
read -rp "Are you sure you want to continue? (y/N) " response
if [[ "$response" != "y" ]]; then
    echo "Operation cancelled by the user."
    exit 1
fi

echo "Running yarn sst remove..."
# try catch 
if ! error_output=$(yarn sst remove --profile "$AWS_PROFILE_NAME" --stage "$SST_STAGE_NAME" --region "$AWS_REGION" 2>&1 1>/dev/tty); then
    handle_errors "$error_output"
fi