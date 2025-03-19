import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { RefreshTokenType } from '../../src/domain/types/system-user.type';
import { ApiResultResponse } from '../domain/types';
import { DURATION_REFRESH_TOKEN, DURATION_TOKEN, JWT_SEED } from './envs';

export class JwtAdapter {

     static async generateToken(payload: Object, duration: any = DURATION_TOKEN): Promise<string | null> {

          return new Promise((resolve) => {

               const secret: Secret = JWT_SEED;
               jwt.sign(payload, secret, { expiresIn: duration }, (err, token) => {
                    if (err) return resolve(null)
                    resolve(token!)
               });

          });

     }

     static validateToken(req: Request, res: Response, next: NextFunction) {
          //get token from request header
          const authHeader = req.header('Authorization') as string;

          let CustomError: ApiResultResponse = {
               status: "error",
               hasError: true,
               data: null,
               message: null,
               statusCode: 400,
               stackTrace: null
          }

          if (!authHeader) {
               CustomError.message = 'No token provided'
               CustomError.statusCode = 401
               return res.status(401).json(CustomError)
          }

          if (!authHeader.startsWith('Bearer ')) {
               CustomError.message = 'Invalid Bearer token'
               CustomError.statusCode = 401
               return res.status(401).json(CustomError)
          }

          const token = authHeader.split(" ")[1]
          //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
          if (token == null) {
               CustomError.message = 'Token not present'
               CustomError.statusCode = 400
               res.sendStatus(400).send({ CustomError })
          }
          //
          // forbidden 403
          jwt.verify(token, JWT_SEED, (err, user) => {
               if (err) {
                    CustomError.message = 'Invalid Bearer token'
                    CustomError.statusCode = 403
                    res.status(403).send(CustomError)
               }
               else {
                    req.body.user = user
                    next()
               }
          });

          // validar unauthorize 401
     }

     static async verifyRefreshToken(email: string, refreshToken: string): Promise<RefreshTokenType | string | null> {
          try {
               const secret: Secret = JWT_SEED;
               let refreshTokenType: RefreshTokenType = {} as RefreshTokenType;

               return new Promise<RefreshTokenType | string | null>((resolve, reject) => {
                    jwt.verify(refreshToken, secret, async (err, decode) => {
                         if (err) {
                              {

                                   return reject(new Error('Error to generate accessToken ' + err));
                              }
                         } else {
                              try {
                                   const newAccessToken = jwt.sign({ email: email }, secret, { expiresIn: DURATION_TOKEN });
                                   if (!newAccessToken) {
                                        return reject(new Error('Error to generate accessToken'));
                                   }
                                   const newRefreshToken = jwt.sign({ email: email }, secret, { expiresIn: DURATION_REFRESH_TOKEN });
                                   if (!newRefreshToken) {
                                        return reject(new Error('Error to generate refreshToken'));
                                   }
                                   refreshTokenType = {
                                        email,
                                        accessToken: newAccessToken!,
                                        refreshToken: newRefreshToken!
                                   };
                                   resolve(refreshTokenType);
                              } catch (error) {
                                   reject(error);
                              }
                         }
                    });
               });

          } catch (error) {
               const err = new Error(error as string)
               return err.message;
          }
     }

}