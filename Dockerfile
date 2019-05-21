FROM node:10.15

WORKDIR /app

ENV NODE_ENV="production"

COPY ./ /app/

RUN npm config set unsafe-perm true
RUN npm install

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "start"]
