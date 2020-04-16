FROM node:carbon

WORKDIR /usr/app/

WORKDIR /usr/app/server/

COPY server/package*.json ./

RUN npm install

COPY server/ ./

EXPOSE 8080
CMD [ "npm", "start" ] 