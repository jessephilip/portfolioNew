FROM node:lts-alpine

EXPOSE 3000

COPY ./server/ ./server/

WORKDIR /server

RUN npm install && npm run build

WORKDIR /

COPY ./client/ ./client/

WORKDIR /client

RUN npm install && npm run build
