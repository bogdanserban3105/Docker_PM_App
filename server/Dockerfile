# Fetching the latest node image on apline linux
FROM node:alpine AS builder

RUN npm install -g nodemon

# Creating a directory for our application
WORKDIR /app

# Installing dependencies
COPY ./package.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Exposing port 4000
EXPOSE 4000

# Running our app
CMD ["node", "app.js"] 