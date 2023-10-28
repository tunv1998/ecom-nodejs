FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/index.js" ]

EXPOSE 4000