FROM node:alpine

WORKDIR /app/scheduler
COPY ./packages /app/packages
COPY ./scheduler/package.json /app/scheduler

RUN npm config set registry https://registry.npm.taobao.org && npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD npm start
