FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/apis/api-app
COPY ./packages /app/packages
COPY ./apis/api-app/package.json /app/apis/api-app

RUN yarn

COPY . /app

RUN npm run build

EXPOSE 8001

CMD npm start
