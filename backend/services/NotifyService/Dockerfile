FROM node:22-slim

WORKDIR /backend/services/NotifyService

COPY backend/services/NotifyService/package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]