import { CustomException } from '../errors/CustomException.error';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { AuthService } from '../services/app/auth.services';
import { Request, Response } from 'express';
import { UnauthorizedException } from '../errors/UnauthorizedException.error';
import { AppUserPayload } from '../schema/token-payload.schema';

const jwtMiddleware = new JwtMiddleware();
const authService = new AuthService();
// const userService = new UserService();

export async function authenticateAppUser(req: Request, res: Response) {
  try {
    const authUser = await authService.loginWithPhone(req.body.phone);

    if (authUser.authenticated && authUser.data) {
      const { token, validity } = jwtMiddleware.generateAppUserToken({
        id: authUser.data.id,
        username: authUser.data.username,
        email: authUser.data.email,
        phone: authUser.data.phone
      } as AppUserPayload);

      res.json({
        data: {
          auth: {
            jwt: token,
            validity: validity,
          },
          userInfo: {
            id: authUser.data.id,
            username: authUser.data.username,
            email: authUser.data.email,
            phone: authUser.data.phone,
            avatar_url: authUser.data.avatar_url,
            country: authUser.data.country,
            currency: authUser.data.currency,
            status: authUser.data.status,
            guest: authUser.data.guest,
            createdAt: authUser.data.createdAt,
          },
          balance: authUser.data.balance,
          tier: authUser.data.tier,
        },
        statusCode: 200
      });
    } else {
      throw new UnauthorizedException(authUser.message!);
    }
  } catch (e: any) {
    if (e.constructor.name === 'RestException') {
      return res
        .status(500)
        .json({
          error:{
            message: 'Failed to send SMS. Please try again.'
          },
          code: 500,
        });
    }

    if (e instanceof CustomException) {
      return res
        .status(e.statusCode)
        .json({ 
          error:{
            message: e.message
          },
          code: e.statusCode 
        });
    }

    return res
      .status(500)
      .json({
        error:{
          message: 'Something went wrong! Please try again.',
        },
        code: 500 
      });
  }
}