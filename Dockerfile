FROM node:carbon

WORKDIR /usr/app/

WORKDIR /usr/app/server/

COPY server/package*.json ./

RUN npm install

expose 12345

expose 3306

COPY server/ ./

CMD [ "npm", "start" ] 