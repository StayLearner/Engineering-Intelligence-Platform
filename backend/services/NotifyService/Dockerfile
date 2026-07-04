FROM node:22-slim

WORKDIR /backend

COPY backend/packages ./packages
COPY backend/services/NotifyService ./services/NotifyService

WORKDIR /backend/services/NotifyService

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "dev"]