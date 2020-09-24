#!/bin/bash

yarn
yarn add apollo-server graphql typescript
yarn add -D eslint ts-node-dev 
mkdir src
touch src/index.js
touch .gitignore
echo "node_modules" >> .gitignore
