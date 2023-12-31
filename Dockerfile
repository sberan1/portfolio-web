# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files to leverage Docker cache
COPY package*.json ./

# Install SvelteKit dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . ./

# Build the SvelteKit app
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run the app
CMD ["npm", "start"]
