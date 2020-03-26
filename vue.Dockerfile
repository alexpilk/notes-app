FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /app

# copy source code
COPY front/notes_app/ ./

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve", "--disable-host-check"]
