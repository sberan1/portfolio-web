#!/bin/sh
# Install dependencies again
npm i
# Run migrations
npx prisma migrate deploy

node dist/main.js
