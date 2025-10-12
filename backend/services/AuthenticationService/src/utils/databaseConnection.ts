import { PrismaClient } from '../generated/prisma';

// This creates one single instance of the Prisma Client
const prisma = new PrismaClient();


export default prisma;