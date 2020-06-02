FROM node:lts-alpine

EXPOSE 3000

RUN mkdir /app

COPY ./server/ ./app/server/

WORKDIR /app/server

RUN npm install && npm run build

WORKDIR /

COPY ./client/ ./app/client/

WORKDIR /app/client

RUN npm install && npm run prod

WORKDIR /

CMD [ "node", "app/server/dist/server/main.js" ]
