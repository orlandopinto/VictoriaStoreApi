import jwt, { Secret } from 'jsonwebtoken'
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

     //se puede crear un tipo para trabajarlo mejor
     static validateToken<T>(token: string): Promise<T | null>{

          return new Promise((resolve, reject) => {

               jwt.verify(token, JWT_SEED, (err, decoded) => {
                    if (err) {
                         return reject(null);
                    }
                    resolve(decoded as T);
               });

          });

     }

}