FROM node:22-alpine

# Create the app directory
RUN mkdir -p /fback
WORKDIR /fback

# Add package.json and yarn.lock first to leverage Docker cache
ADD package.json /fback
ADD yarn.lock /fback

# Install all dependencies, including development dependencies
RUN yarn install --frozen-lockfile

# Copy all the application files
COPY . /fback

# Build the NestJS app (compile TypeScript to JavaScript)
RUN yarn build

# Expose the port your app is using (adjust if necessary)
EXPOSE 3000

# Command to start your app
CMD ["yarn", "start"]
