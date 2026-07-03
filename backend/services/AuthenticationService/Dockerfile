FROM node:22-slim

WORKDIR /backend/services/AuthenticationService

COPY backend/services/AuthenticationService/package*.json ./

RUN npm install

CMD ["npm", "run", "dev"]