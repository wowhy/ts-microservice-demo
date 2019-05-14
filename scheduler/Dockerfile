FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/scheduler
COPY ./packages /app/packages
COPY ./scheduler/package.json /app/scheduler

RUN yarn

COPY . /app

RUN npm run build

EXPOSE 3000

CMD npm start
