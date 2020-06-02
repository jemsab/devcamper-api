FROM node:14-slim

WORKDIR /app/devcamper

COPY package*.json ./

RUN npm install

RUN npm install pm2

COPY . .

EXPOSE 5000

CMD ["npm","start"]
