FROM node:21-alpine as builder

ENV NODE_ENV development

WORKDIR /opt/app/

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN yarn
RUN yarn build 

# Starting our application
CMD [ "yarn", "start" ]

# Exposing server port
EXPOSE 3000