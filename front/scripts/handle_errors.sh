#!/usr/bin/env bash

function handle_errors() {
    local error_output=$1
    echo "$error_output"
    echo "================================"
    # Check if the error message in the error_output contains the string indicating it's a credentials issue
    if [[ $error_output == *"Could not load credentials from any providers"* ]]; then
        echo "The operation failed because credentials from your AWS profile could not be loaded. Have you checked the following?
        - Does the AWS profile you specified exist?
        - If the AWS profile has MFA, has it been authorised (e.g. using Leapp: https://www.leapp.cloud/)"
    else
        echo "Something went wrong."
    fi
    echo "================================"
    exit 1
}
