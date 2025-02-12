# Use Node.js as base image
FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend code
COPY . .

# Expose the frontend port
EXPOSE 3001

# Start the React app
CMD ["npm", "start"]
