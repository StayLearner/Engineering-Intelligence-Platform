import { defineConfig, env } from 'prisma/config';
import dotenv from 'dotenv';
import * as path from 'path';


dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
url: process.env.DOCKER_DATABASE_URL!,  },
});