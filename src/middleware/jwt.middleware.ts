import { NextFunction, Response } from 'express';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { AppUserPayload } from '../schema/token-payload.schema';
import { AppAuthenticatedRequest } from '../types/authenticate.type';
import { getEnvVar } from '../utils/common.utils';
import { datetimeYMDHis } from '../utils/datetime.utils';

export class JwtMiddleware {
  generateAppUserToken(payload: AppUserPayload): { token: string, validity: string } {
    const expiresIn = Number(getEnvVar('JWT_EXPIRY'));
    return {
      token: sign(payload, getEnvVar('JWT_SECRET'), {
        expiresIn: `${expiresIn} days`,
      }),
      validity: datetimeYMDHis(null, 'days', expiresIn)
    }
    
  }

  async verifyAppUserToken(
    req: AppAuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader?.startsWith('Bearer '))
        return res.status(401).json({ message: 'You are not logged in!' });

      const token = authHeader.split(' ')[1];

      const payload = verify(token, getEnvVar('JWT_SECRET'));

      if (payload) {
        req.user = payload as AppUserPayload;

      // Additional logic if need be

        next();
      } else {
        throw new TokenExpiredError('Auth token expired! Please login again.', new Date());
      }
    } catch (e: any) {
      if(e instanceof TokenExpiredError)
        return res
        .status(401)
        .json({ message: e.message });

      return res
        .status(500)
        .json({ message: 'Something went wrong! Please try again.' });
    }
  }
}
