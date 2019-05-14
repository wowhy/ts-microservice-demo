FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/workers/worker-user
COPY ./packages /app/packages
COPY ./workers/worker-user/package.json /app/workers/worker-user

RUN yarn

COPY . /app

RUN npm run build

CMD npm start
