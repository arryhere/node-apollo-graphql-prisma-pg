export const config = {
  app: {
    APP_ENV: process.env.APP_ENV,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: Number.parseInt(process.env.APP_PORT || '4005', 10),
  },

  postgres: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_DATABASE_URL: process.env.POSTGRES_DATABASE_URL,
  },
};
