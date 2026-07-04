FROM node:22-slim

WORKDIR /backend

COPY backend/packages ./packages
COPY backend/services/OrganizationService ./services/OrganizationService
COPY database ./database

WORKDIR /backend/services/OrganizationService

RUN npm install

EXPOSE 3003

CMD ["npm", "run", "dev"]