# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

#install nodemon to provide hot-reloading functionality.
RUN npm install nodemon --save-dev

# Copying all the files in our project
COPY . .

# Exposing port 3000
EXPOSE 3000

# Running our app
CMD ["npm", "start"]
