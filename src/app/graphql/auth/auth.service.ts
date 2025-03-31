import { TokenType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config.js';
import { EmailService } from '../../../lib/emailService.lib.js';
import { exceptionHandler } from '../../../lib/exceptionHandler.lib.js';
import { prisma } from '../../../lib/prisma.lib.js';
import type { GraphQLBaseResponse } from '../common/dto/graphqlBase.response.js';
import type { SignUpInput } from './dto/signUp.input.js';

export class AuthService {
  private readonly emailService: EmailService = new EmailService();

  async signUp(signUpInput: SignUpInput): Promise<GraphQLBaseResponse> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: signUpInput.email },
      });

      if (existingUser) {
        throw new GraphQLError('Email already in use, contact support');
      }

      const passwordHash = await bcrypt.hash(signUpInput.password, 10);

      const newUser = await prisma.user.create({
        data: {
          firstName: signUpInput.firstName,
          lastName: signUpInput.lastName,
          email: signUpInput.email,
          dob: signUpInput.dob,
          phoneNumber: signUpInput.phoneNumber,
          passwordHash: passwordHash,
        },
      });

      const verifyToken = jwt.sign({ email: signUpInput.email }, config.jwtSecret.JWT_VERIFY_TOKEN_SECRET, {
        expiresIn: '10m',
      });

      await prisma.token.create({
        data: {
          token: verifyToken,
          tokenType: TokenType.VERIFY_TOKEN,
          userId: newUser.id,
        },
      });

      await this.emailService.sendEmail('User Verification Link', `token: ${verifyToken}`, signUpInput.email);

      return {
        environment: config.app.APP_ENV,
        success: true,
        message: 'User created successfully, please check your email to verify your account',
      };
    } catch (error) {
      exceptionHandler(error, 'Error: AuthService > signUp');
    }
  }
}
