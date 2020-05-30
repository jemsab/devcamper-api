FROM node:14-slim

WORKDIR /app/devcamper

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
