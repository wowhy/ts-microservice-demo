FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/listeners/listener-user
COPY ./packages /app/packages
COPY ./listeners/listener-user/package.json /app/listeners/listener-user

RUN yarn

COPY . /app

RUN npm run build

CMD npm start
