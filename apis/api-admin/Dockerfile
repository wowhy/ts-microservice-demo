FROM node:alpine

WORKDIR /app/apis/api-admin
COPY ./packages /app/packages
COPY ./apis/api-admin/package.json /app/apis/api-admin

RUN npm config set registry https://registry.npm.taobao.org && npm install -g yarn && yarn

COPY . /app

RUN npm run build

EXPOSE 8002

CMD npm start
