FROM node:8

#App dir
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY . .

RUN npm build

EXPOSE 5000

CMD [ "serve", "-s","build" ]

