FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/
WORKDIR /srv/app/

COPY package.json /srv/app/.

RUN npm install

COPY . /srv/app/.

EXPOSE 5000
CMD ["npm", "start"]


