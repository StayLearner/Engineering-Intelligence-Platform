FROM node:22-slim

WORKDIR /backend

COPY backend/packages ./packages
COPY backend/services/OrganizationService ./services/OrganizationService

WORKDIR /backend/services/OrganizationService

RUN npm install

EXPOSE 3002

CMD ["npm", "run", "dev"]