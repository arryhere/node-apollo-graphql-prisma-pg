export const config = {
  app: {
    APP_ENV: process.env.APP_ENV || '',
    APP_HOST: process.env.APP_HOST || '',
    APP_PORT: Number.parseInt(process.env.APP_PORT || '4005', 10),
  },

  postgres: {
    POSTGRES_USER: process.env.POSTGRES_USER || '',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
    POSTGRES_DB: process.env.POSTGRES_DB || '',
    POSTGRES_DATABASE_URL: process.env.POSTGRES_DATABASE_URL || '',
  },

  jwtSecret: {
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    JWT_VERIFY_TOKEN_SECRET: process.env.JWT_VERIFY_TOKEN_SECRET || '',
    JWT_FORGOT_PASSWORD_TOKEN_SECRET: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET || '',
  },

  smtp: {
    SMTP_HOST: process.env.SMTP_HOST || '',
    SMTP_PORT: Number.parseInt(process.env.SMTP_PORT || '465', 10),
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  },

  email: {
    EMAIL_FROM: process.env.EMAIL_FROM || '',
  },
};
