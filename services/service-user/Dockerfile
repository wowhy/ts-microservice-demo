FROM node:alpine

RUN apk add make gcc g++ python\
  && npm config set registry https://registry.npm.taobao.org\
  && npm install -g yarn\
  && yarn config set registry https://registry.npm.taobao.org

WORKDIR /app/services/service-user
COPY ./packages /app/packages
COPY ./services/service-user/package.json /app/services/service-user

RUN yarn

COPY . /app

RUN npm run build

EXPOSE 3000

CMD npm start
