import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';

export default definePrismaConfig({
  contract: './src/prisma/contract.prisma',
  datasource: {
    url: process.env['DATABASE_URL']!,
  },
});