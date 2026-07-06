FROM node:22-slim

WORKDIR /backend

COPY backend/packages ./packages
COPY backend/services/RepositoryService ./services/RepositoryService
COPY database ./database

WORKDIR /backend/services/RepositoryService

RUN npm install

EXPOSE 3004

CMD ["npm", "run", "dev"]