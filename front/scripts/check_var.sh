#!/usr/bin/env bash

check_var() {
    local var_name="$1"
    local var_value="${!1}"
    local file_name="$2"
    local obscure="$3"

    if [[ -z "${var_value}" ]]; then
        echo "${var_name} isn't set in ${file_name}"
        exit 1
    else
        if [[ -n "$obscure" ]]; then
            local obscured_value="${var_value//?/*}"
            echo "Variable ${var_name} is set: ${obscured_value}"
        else
            echo "Variable ${var_name} is set: ${var_value}"
        fi
    fi
}