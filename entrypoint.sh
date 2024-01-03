#!/bin/sh
# Install dependencies again
npm i
# Run migrations
npx prisma migrate deploy

npm run start
