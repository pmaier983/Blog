# To Build this image you must first remove any line containing TypographyStyle 
# I'm not 100% sure why its breaking things
FROM node:alpine

COPY . /usr/src
WORKDIR /usr/src 

RUN npm i

RUN ls

RUN npm run build
EXPOSE 3000
CMD npm run dev
