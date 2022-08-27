FROM node:14.18.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn --frozen-lockfile

COPY . /usr/src/app/

EXPOSE 3000
CMD ["node", "index.js"]