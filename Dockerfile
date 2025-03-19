# Use Node.js Alpine for a lightweight image
FROM node:22-alpine

# Set environment variables
ENV NODE_ENV=production

# Create the app directory
WORKDIR /fback

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production=true

# Copy the rest of the application files
COPY . .

# Expose the port your app is using
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
