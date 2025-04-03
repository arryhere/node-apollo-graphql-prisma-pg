import env from 'env-var';

export const config = {
  app: {
    APP_ENV: env.get('APP_ENV').required().asString(),
    APP_HOST: env.get('APP_HOST').required().asString(),
    APP_PORT: env.get('APP_PORT').required().asPortNumber(),
  },

  postgres: {
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
    POSTGRES_DATABASE_URL: env.get('POSTGRES_DATABASE_URL').required().asString(),
  },

  jwtSecret: {
    JWT_ACCESS_TOKEN_SECRET: env.get('JWT_ACCESS_TOKEN_SECRET').required().asString(),
    JWT_REFRESH_TOKEN_SECRET: env.get('JWT_REFRESH_TOKEN_SECRET').required().asString(),
    JWT_VERIFY_TOKEN_SECRET: env.get('JWT_VERIFY_TOKEN_SECRET').required().asString(),
    JWT_FORGOT_PASSWORD_TOKEN_SECRET: env.get('JWT_FORGOT_PASSWORD_TOKEN_SECRET').required().asString(),
  },

  smtp: {
    SMTP_HOST: env.get('SMTP_HOST').required().asString(),
    SMTP_PORT: env.get('SMTP_PORT').required().asPortNumber(),
    SMTP_USER: env.get('SMTP_USER').required().asString(),
    SMTP_PASSWORD: env.get('SMTP_PASSWORD').required().asString(),
  },

  email: {
    EMAIL_FROM: env.get('EMAIL_FROM').required().asString(),
  },

  jwtExpiration: {
    JWT_ACCESS_TOKEN_EXPIRATION: env.get('JWT_ACCESS_TOKEN_EXPIRATION').required().asIntPositive(),
    JWT_REFRESH_TOKEN_EXPIRATION: env.get('JWT_REFRESH_TOKEN_EXPIRATION').required().asIntPositive(),
    JWT_VERIFY_TOKEN_EXPIRATION: env.get('JWT_VERIFY_TOKEN_EXPIRATION').required().asIntPositive(),
    JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION: env.get('JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION').required().asIntPositive(),
  },
};
