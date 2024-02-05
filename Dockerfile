# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# RUN npm run dev

# Expose the port that Next.js uses (default is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
