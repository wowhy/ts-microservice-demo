FROM node:alpine

RUN apk add python make gcc g++

WORKDIR /app/services/service-user
COPY ./packages /app/packages
COPY ./services/service-user/package.json /app/services/service-user

RUN npm config set registry https://registry.npm.taobao.org && npm install -g yarn && yarn

COPY . /app

RUN npm run build

EXPOSE 3000

CMD npm start
