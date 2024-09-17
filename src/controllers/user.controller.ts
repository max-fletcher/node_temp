import { UnauthorizedException } from '../errors/UnauthorizedException.error';
import { UserService } from '../../services/user.services';
import { Request, Response } from 'express';

const userService = new UserService();

export async function getUser(req: Request, res: Response) {
  if (!req?.params?.id) throw new UnauthorizedException('You are unauthorized!');

  const email = req.query.email as string;
  const mongoUser = await userService.getMongoUser(email);

  return res.status(200).json({
    mongoUser,
  });
}
