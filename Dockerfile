FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
