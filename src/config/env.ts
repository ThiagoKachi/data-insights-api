import 'dotenv/config';

export const env = {
  JWT_SECRET: process.env.JWT_SECRET!,
  DATABASE_URL: process.env.DATABASE_URL!,
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_USER: process.env.DATABASE_USER!,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  APP_WEB_URL: process.env.APP_WEB_URL!,
};
