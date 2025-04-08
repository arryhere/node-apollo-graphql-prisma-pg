enum APP_ENV {
  DEV = 'DEV',
  STAGING = 'STAGING',
  PROD = 'PROD',
  TEST = 'TEST',
}

enum TokenType {
  VERIFY_TOKEN = 'VERIFY_TOKEN',
  FORGOT_PASSWORD_TOKEN = 'FORGOT_PASSWORD_TOKEN',
  TWO_FA_TOKEN = 'TWO_FA_TOKEN',
}

export const APP_ENUM = {
  APP_ENV,
  TokenType,
};
