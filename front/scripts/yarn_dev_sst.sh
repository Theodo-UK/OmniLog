#!/usr/bin/env bash

project_path=$(pwd)

# cd to path of script for path resolution
script_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )
cd "$script_path" || exit 1

source ./source_if_file_exists.sh
source ./handle_errors.sh
source ./check_var.sh

source_if_file_exists "../.env.development"

ENV_FILE_NAME=".env.development"

check_var "AWS_PROFILE_NAME" "$ENV_FILE_NAME"
check_var "SST_STAGE_NAME" "$ENV_FILE_NAME"

echo "Running yarn sst dev..."
cd "$project_path" || exit 1
# Check if command failed
if ! error_output=$(yarn sst dev --profile "$AWS_PROFILE_NAME" --stage "$SST_STAGE_NAME" 2>&1 1>/dev/tty); then
    handle_errors "$error_output"
fi