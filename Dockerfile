FROM node:latest AS build
WORKDIR /app
COPY / ./
COPY package*.json ./

RUN npm build

EXPOSE 4200

CMD ["ng serve"]
