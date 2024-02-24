import jwt from 'jsonwebtoken';
import config from '@config';
import crypto from 'crypto';
import { UserAuthorizationError, UncorrectTokenError } from '@errors';
export class LoginToken {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  signAccessToken(): string {
    return jwt.sign({ ...this }, config.jwtAccessKey, { expiresIn: '1d' });
  }

  signRefreshToken(): string {
    return jwt.sign({ ...this }, config.jwtRefreshKey, { expiresIn: '14d' });
  }

  public static getUserIdFromAccessToken(token: string): string {
    try {
      const decoded = jwt.verify(token, config.jwtAccessKey) as LoginToken;
      return decoded.userId;
    } catch (err) {
      throw new UserAuthorizationError('유저 인증에 실패했습니다');
    }
  }

  public static getUserIdFromRefreshToken(token: string): string {
    try {
      const decoded = jwt.verify(token, config.jwtRefreshKey) as LoginToken;
      return decoded.userId;
    } catch (err) {
      throw new UserAuthorizationError('유저 인증에 실패했습니다');
    }
  }
}
