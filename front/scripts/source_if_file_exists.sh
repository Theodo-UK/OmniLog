#!/usr/bin/env bash

source_if_file_exists() {
    local file_name="$1"
    if [[ ! -f "${file_name}" ]]; then
        echo "File '${file_name}' does not exist. Exiting..."
        exit 1
    else
        echo "File '${file_name}' exists. Sourcing..."
        # shellcheck disable=SC1090
        source "${file_name}" 
    fi
}
