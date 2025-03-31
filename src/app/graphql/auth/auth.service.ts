import { TokenType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { differenceInMinutes } from 'date-fns';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config.js';
import { EmailService } from '../../../lib/emailService.lib.js';
import { exceptionHandler } from '../../../lib/exceptionHandler.lib.js';
import { prisma } from '../../../lib/prisma.lib.js';
import type { GraphQLBaseResponse } from '../common/dto/graphqlBase.response.js';
import type { SignUpInput } from './dto/signUp.input.js';
import type { VerifyInput } from './dto/verify.input.js';
import type { VerifyLinkInput } from './dto/verifyLink.input.js';

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

  async verifyLink(verifyLinkInput: VerifyLinkInput): Promise<GraphQLBaseResponse> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: verifyLinkInput.email },
      });

      if (!existingUser) {
        throw new GraphQLError('User not found');
      }

      const passwordMatch = await bcrypt.compare(verifyLinkInput.password, existingUser.passwordHash);

      if (!passwordMatch) {
        throw new GraphQLError('Invalid Credentials');
      }

      if (existingUser.verified) {
        throw new GraphQLError('User already verified');
      }

      if (!existingUser.active) {
        throw new GraphQLError('User not active');
      }

      const verifyToken = jwt.sign({ email: verifyLinkInput.email }, config.jwtSecret.JWT_VERIFY_TOKEN_SECRET, {
        expiresIn: '10m',
      });

      await prisma.token.create({
        data: {
          token: verifyToken,
          tokenType: TokenType.VERIFY_TOKEN,
          userId: existingUser.id,
        },
      });

      await this.emailService.sendEmail('User Verification Link', `token: ${verifyToken}`, verifyLinkInput.email);

      return {
        environment: config.app.APP_ENV,
        success: true,
        message: 'User verification link sent successfully',
      };
    } catch (error) {
      exceptionHandler(error, 'Error: AuthService > verifyLink');
    }
  }

  async verify(verifyInput: VerifyInput): Promise<GraphQLBaseResponse> {
    try {
      let jwtVerified: jwt.JwtPayload | null = null;

      try {
        jwtVerified = jwt.verify(verifyInput.token, config.jwtSecret.JWT_VERIFY_TOKEN_SECRET) as jwt.JwtPayload;
      } catch (error) {
        throw new GraphQLError('Invalid or expired token');
      }

      if (!jwtVerified) {
        throw new GraphQLError('Invalid or expired token');
      }

      const user = await prisma.user.findUnique({
        where: { email: jwtVerified.email },
      });

      if (!user) {
        throw new GraphQLError('User not found');
      }

      const token = await prisma.token.findUnique({
        where: { userId_token: { userId: user.id, token: verifyInput.token } },
      });

      if (!token) {
        throw new GraphQLError('Token not found');
      }

      if (token.tokenType !== TokenType.VERIFY_TOKEN) {
        throw new GraphQLError('Invalid token type');
      }

      if (differenceInMinutes(new Date(), token.createdAt) > 10) {
        await prisma.token.delete({
          where: { userId_token: { userId: user.id, token: verifyInput.token } },
        });

        throw new GraphQLError('Token expired');
      }

      await prisma.user.update({
        where: { email: jwtVerified.email },
        data: { verified: true },
      });

      await prisma.token.delete({
        where: { userId_token: { userId: user.id, token: verifyInput.token } },
      });

      return {
        environment: config.app.APP_ENV,
        success: true,
        message: 'User verified successfully',
      };
    } catch (error) {
      exceptionHandler(error, 'Error: AuthService > verify');
    }
  }
}
