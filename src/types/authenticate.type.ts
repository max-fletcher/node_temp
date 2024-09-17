import { Request } from 'express';
import { AppUserPayload, UserPayload } from '../schema/token-payload.schema';

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
  files?: any;
}

export interface AppAuthenticatedRequest extends Request {
  user?: AppUserPayload;
}