FROM node:20

WORKDIR /usr/src

COPY . .

RUN npm install
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 8080
