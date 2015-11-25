FROM node:4.2.1-slim

ADD package.json /src/package.json
ADD server/package.json /src/server/package.json
RUN cd /src; npm install

COPY . /src
RUN cd /src; node ./node_modules/gulp/bin/gulp.js dist

EXPOSE 8080

WORKDIR /src/server
CMD ["npm", "start"]
