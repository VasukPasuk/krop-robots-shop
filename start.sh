#!/bin/sh
# Чекаємо, поки база даних стане доступною
echo "Waiting for database to be ready..."
./wait-for-it.sh db:5432 -t 60

# Запускаємо міграції
echo "Running database migrations..."
npx prisma migrate deploy

# Запускаємо seeding
echo "Running seeding..."
npm run prisma:seed

# Запускаємо сервер
echo "Starting the server..."
npm run start:prod