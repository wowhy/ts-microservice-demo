FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/apis/api-admin
COPY ./packages /app/packages
COPY ./apis/api-admin/package.json /app/apis/api-admin

RUN yarn

COPY . /app

RUN npm run build

EXPOSE 8002

CMD npm start
