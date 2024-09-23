# Use official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run Prisma Client
RUN npx prisma generate

# Run Prisma Migration
RUN npx prisma migrate

# Build the NestJS app
RUN npm run build

# Expose the port NestJS will run on
EXPOSE 4000

# Start the NestJS server
CMD ["npm", "run", "start:prod"]
