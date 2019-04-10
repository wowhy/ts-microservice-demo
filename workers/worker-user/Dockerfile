FROM node:alpine

WORKDIR /app/workers/worker-user
COPY ./packages /app/packages
COPY ./workers/worker-user/package.json /app/workers/worker-user

RUN npm config set registry https://registry.npm.taobao.org && npm install -g yarn && yarn

COPY . /app

RUN npm run build

CMD npm start
