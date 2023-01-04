# Specify a base image
# from dockerhub
FROM node:14.17.6-alpine as builder


# all other commands will be executed relative to this directory
# our code will live here
WORKDIR /app

# A wildcard is used to ensure both package.json 
# AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# copy over all other files to container
COPY . .

# Build the app
RUN npm run build

# COPY /app/dist .
# COPY /app/env .
# COPY /app/.sequelizerc .
# COPY /app/Dockerfile .

# use EXPOSE command to have our port mapped by the docker deamon
EXPOSE 5600

# our default dev command
CMD ["npm","run","start"]
