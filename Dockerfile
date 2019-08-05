FROM node:10.15

WORKDIR /app

ARG NODE_APP_INSTANCE="production"

ENV NODE_ENV="production"
ENV NODE_APP_INSTANCE=$NODE_APP_INSTANCE

COPY package.json /app/
RUN NODE_ENV=development npm install

COPY ./ /app/

CMD ["npm", "run", "start"]
