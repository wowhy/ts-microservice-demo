FROM node:alpine

WORKDIR /app/listeners/listener-user
COPY ./packages /app/packages
COPY ./listeners/listener-user/package.json /app/listeners/listener-user

RUN npm config set registry https://registry.npm.taobao.org && npm install -g yarn && yarn

COPY . /app

RUN npm run build

CMD npm start
