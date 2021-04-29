#!/usr/bin/env bash

source ./scripts/messenger.sh

printf "\n"
success "Linting..."
npm run lint
npm run lint:spec

printf "\n"
./scripts/todo.js
success "Creating TODOs...\n"

printf "\n"
success "Building...\n"
npm run build
./node_modules/.bin/grunt uglify:validatorjs

printf "\n"

success "Build Process Complete" " SUCCESS "
printf "\n"
