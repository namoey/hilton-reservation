FROM node:lts-alpine
ENV NODE_ENV=production
ENV MONGO_HOST=0.0.0.0
ENV MONGO_PORT=27017
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 4000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
