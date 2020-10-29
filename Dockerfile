FROM node:alpine

COPY . /usr/src
WORKDIR /usr/src 

RUN npm i

RUN ls

RUN npm run build
EXPOSE 3000
CMD npm run dev
