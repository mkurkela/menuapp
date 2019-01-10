FROM node:8.7.0-alpine

#App dir
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . /usr/app/

RUN npm build

CMD [ "npm", "start" ]

