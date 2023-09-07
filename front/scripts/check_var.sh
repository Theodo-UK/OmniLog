#!/usr/bin/env bash

check_var() {
    local var_name="$1"
    local var_value="${!1}"
    local file_name="$2"
    if [[ -z "${var_value}" ]]; then
        echo "${var_name} isn't set in ${file_name}"
        exit 1
    else
        echo "Variable ${var_name} is set: ${var_value}"
    fi
}