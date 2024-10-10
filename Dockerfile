FROM node:20.11.1
ENV NODE_ENV development   
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
EXPOSE 3000
CMD ['npm', 'run','dev']