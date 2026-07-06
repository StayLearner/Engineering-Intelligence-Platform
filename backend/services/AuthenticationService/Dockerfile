FROM node:22-slim

WORKDIR /backend

COPY backend/packages ./packages
COPY backend/services/AuthenticationService ./services/AuthenticationService

WORKDIR /backend/services/AuthenticationService

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "dev"]