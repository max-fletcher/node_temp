import express from 'express';
// import { validateRequestBody } from '../../utils/validatiion.utils';
import { JwtMiddleware } from '../../middleware/jwt.middleware';
const appAuthRouter = express.Router();

// const jwtMiddleware = new JwtMiddleware()

// Define routes
// appAuthRouter
//   .post(
//     '/login',
//     validateRequestBody(appRegistrationReqeustSchema),
//     authenticateAppUser,
//   )
//   .post(
//     '/verifyOTP',
//     jwtMiddleware.verifyAppUserToken,
//     validateRequestBody(appVerifyOtpSchema),
//     verifyOTP,
//   )
//   .get(
//     '/resendOTP',
//     jwtMiddleware.verifyAppUserToken,
//     resendOTP,
//   )
//   .post(
//     '/socialLogin/:provider',
//     socialLogin,
//   );

export { appAuthRouter };
