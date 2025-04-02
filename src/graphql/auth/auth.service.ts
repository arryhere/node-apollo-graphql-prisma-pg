import { TokenType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { differenceInMinutes } from 'date-fns';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { prisma } from '../../db/prisma.js';
import { EmailService } from '../lib/emailService.lib.js';
import type { GraphQLBaseResponse } from '../lib/graphqlBaseResponse.lib.js';
import { graphqlExceptionHandler } from '../lib/graphqlExceptionHandler.lib.js';
import type { SignInInput } from './dto/signIn.input.js';
import type { SignInOutput } from './dto/signIn.output.js';
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
      graphqlExceptionHandler(error, 'Error: AuthService > signUp');
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

      const passwordCompare = await bcrypt.compare(verifyLinkInput.password, existingUser.passwordHash);

      if (!passwordCompare) {
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
      graphqlExceptionHandler(error, 'Error: AuthService > verifyLink');
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
      graphqlExceptionHandler(error, 'Error: AuthService > verify');
    }
  }

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: signInInput.email },
      });

      if (!user) {
        throw new GraphQLError('User not found');
      }

      if (!user.active) {
        throw new GraphQLError('User not active, contact support');
      }

      if (user.accountLockedAt) {
        const accountLockedAtDifference = differenceInMinutes(new Date(), user.accountLockedAt);
        if (accountLockedAtDifference < 60) {
          return {
            environment: config.app.APP_ENV,
            success: false,
            message: `User account locked, please try again after ${60 - accountLockedAtDifference}mins`,
            body: {
              accessToken: '',
              refreshToken: '',
            },
          };
        }
      }

      if (!user.verified) {
        try {
          const verifyToken = jwt.sign({ email: signInInput.email }, config.jwtSecret.JWT_VERIFY_TOKEN_SECRET, {
            expiresIn: '10m',
          });

          await this.emailService.sendEmail('User Verification Link', `token: ${verifyToken}`, signInInput.email);

          return {
            environment: config.app.APP_ENV,
            success: false,
            message: 'User not verified, verification link sent',
            body: {
              accessToken: '',
              refreshToken: '',
            },
          };
        } catch {
          throw new GraphQLError('User not verified, failed to send verification link');
        }
      }

      const passwordCompare = await bcrypt.compare(signInInput.password, user.passwordHash);

      if (!passwordCompare) {
        throw new GraphQLError('Invalid Credentials');
      }

      const accessToken = jwt.sign({ id: user.id }, config.jwtSecret.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign({ id: user.id }, config.jwtSecret.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      return {
        environment: config.app.APP_ENV,
        success: true,
        message: 'SignIn success',
        body: {
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      graphqlExceptionHandler(error, 'Error: AuthService > signIn');
    }
  }
}
