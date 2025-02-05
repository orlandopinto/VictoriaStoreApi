import jwt, { Secret } from 'jsonwebtoken'

export class JwtAdapter {

     static async generateToken(payload: Object, duration: any = '2h'): Promise<string | null> {

          return new Promise((resolve) => {

               const secret: Secret = 'SEED';
               jwt.sign(payload, secret, { expiresIn: duration }, (err, token) => {
                    if (err) return resolve(null)
                    resolve(token!)
               })

          })

     }

}