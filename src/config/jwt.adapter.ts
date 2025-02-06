import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

     static async generateToken(payload: Object, duration: any = '2h'): Promise<string | null> {

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
          if (!authHeader) {
               return res.status(401).json({ error: 'No token provided' })
          }

          if (!authHeader.startsWith('Bearer ')) {
               return res.status(401).json({ error: 'Invalid Bearer token' })
          }

          const token = authHeader.split(" ")[1]
          //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
          if (token == null) res.sendStatus(400).send("Token not present")
          jwt.verify(token, JWT_SEED, (err, user) => {
               if (err) {
                    res.status(403).send({ error: 'Invalid Bearer token' })
               }
               else {
                    req.body.user = user
                    next() //proceed to the next action in the calling function
               }
          }) //end of jwt.verify()
     } //end of function

}