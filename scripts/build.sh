#!/usr/bin/env bash

source ./scripts/messenger.sh

printf "\n"
success "Linting..."
npm run lint
npm run lint:spec

printf "\n"
success "Creating TODOs...\n"

printf "\n"
success "Building...\n"
npm run build
printf "\n"

success "Build Process Complete" " SUCCESS "