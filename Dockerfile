FROM node:10

WORKDIR /usr/src/app

EXPOSE 3001

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
