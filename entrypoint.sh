#!/bin/bash

# Prisma commands
npx prisma generate

echo "Checking for PostgreSQL availability..."

postgres_migrate() {
  npx prisma migrate dev
}

# Loop until PostgreSQL is ready
until postgres_migrate; do
  echo "Waiting for PostgreSQL to become available..."
  sleep 5
done

# build the application
npm run build

# Start your application
node build/adapter/driver/api/server.js


