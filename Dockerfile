FROM node:lts-alpine

EXPOSE 3000

ENV GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/jessematherne-5355483b7aea.json

VOLUME $GOOGLE_APPLICATION_CREDENTIALS:/tmp/keys/jessematherne-5355483b7aea.json

COPY ./server/ ./server/

WORKDIR /server

RUN npm install && npm run build

WORKDIR /

COPY ./client/ ./client/

WORKDIR /client

RUN npm install && npm run prod

WORKDIR /

CMD [ "node", "server/dist/server/main.js" ]
