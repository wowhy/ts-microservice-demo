FROM node:alpine

WORKDIR /app/apis/api-app
COPY ./packages /app/packages
COPY ./apis/api-app/package.json /app/apis/api-app

RUN npm config set registry https://registry.npm.taobao.org && npm install

COPY . /app

RUN npm run build

EXPOSE 8001

CMD npm start
