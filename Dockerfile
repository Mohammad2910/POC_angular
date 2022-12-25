#FROM node:18-slim AS build
#WORKDIR /app
#COPY / ./
#COPY package*.json ./
#
#RUN npm install
#RUN npm run build
#
#CMD ["npm", "start"]


FROM node:18-alpine as build-step

RUN mkdir -p /app

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
