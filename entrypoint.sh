#!/bin/sh

# Prisma commands
npx prisma generate
npx prisma migrate dev

# build the application
npm run build

# Start your application
node build/adapter/driver/api/server.js


