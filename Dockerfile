FROM node:4.2.1-slim

ENV user card-move-thing
RUN groupadd --system $user && useradd --system --create-home --gid $user $user

COPY . /src
RUN chown $user --recursive /src
USER $user
RUN cd /src; npm install

EXPOSE 8080

WORKDIR /src/server
CMD ["npm", "start"]
