#!/bin/bash

create_env_file() {
    local FILE_NAME=$1
    local CONNECTION_STRING=$2
    local AWS_PROFILE_NAME=$3
    local AWS_REGION=$4
    local SST_STAGE_NAME=$5
    local NEXTAUTH_SECRET=$6
    local NEXTAUTH_URL=$7

    local DATABASE_URI_CONFIG="${CONNECTION_STRING}?pgbouncer=true"

    if [[ -e "$FILE_NAME" ]]; then
        echo "The $FILE_NAME file already exists. Skipping..."
    else
        echo "Creating the $FILE_NAME file..."

        if [[ "$FILE_NAME" == ".env" ]]; then
            echo "DATABASE_URL=${DATABASE_URI_CONFIG}" > "$FILE_NAME"
        fi
        if [[ "$FILE_NAME" == ".env.development" ]]; then
            {
                echo "AWS_PROFILE_NAME=${AWS_PROFILE_NAME}";
                echo "AWS_REGION=${AWS_REGION}";
                echo "DATABASE_URL=${DATABASE_URI_CONFIG}";
                echo "NEXTAUTH_SECRET=secret";
                echo "NEXTAUTH_URL=http://localhost:3000";
                echo "SST_STAGE_NAME=${SST_STAGE_NAME}";
            } > "$FILE_NAME"
        fi
        if [[ "$FILE_NAME" == ".env.production" ]]; then
            {
                echo "AWS_PROFILE_NAME=${AWS_PROFILE_NAME}";
                echo "AWS_REGION=${AWS_REGION}";
                echo "DATABASE_URL=${DATABASE_URI_CONFIG}";
                echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}";
                echo "NEXTAUTH_URL=${NEXTAUTH_URL}";
                echo "SST_STAGE_NAME=${SST_STAGE_NAME}";
            } > "$FILE_NAME"
        fi
    fi
}
