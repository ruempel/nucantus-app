# stage 0: build node app to dist/nucantus directory
FROM node:lts-alpine as build
ENV PROJECT_DIR /tmp
WORKDIR $PROJECT_DIR

COPY package.json $PROJECT_DIR
RUN npm i

COPY . $PROJECT_DIR
RUN npm run build --prod

# stage 1: serve built content as Web app
FROM nginx:alpine
COPY --from=build /tmp/dist/nucantus/ /usr/share/nginx/html/
