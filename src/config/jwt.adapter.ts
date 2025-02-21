import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { DURATION_TOKEN, JWT_SEED } from './envs';
import { ApiResultResponse } from '../domain/types';

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
          })
     }

}