import { Request, Response, NextFunction } from "express"
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export default class AuthMiddleware {

     static validateJWT = async (req: any, res: any, next: NextFunction) => {

          const authorization = req.header('Authorization');
          if (!authorization) {
               return res.status(401).json({ error: 'No token provided' })
          }

          if (!authorization.startsWith('Bearer ')) {
               return res.status(401).json({ error: 'Invalid Bearer token' })
          }

          // en el split el at(1) es similar al .split(' ')[1]
          // el || ' ' es para que siempre retorne un string vacio
          const token = authorization.split(' ').at(1) || ' '

          try {
               const payload = await JwtAdapter.validateToken<{id: string}>(token)
               if (!payload) {
                    return res.status(401).json({ error: 'Invalid token' })
               }

               const user = await UserModel.findById(payload.id);

               if (!user)
               {
                    return res.status(401).json({error:'Invalid token - user not found'})
               }

               req.body.user = user;

               next();
          } catch (error) {
               console.log(error)
               res.status(500).json({ error: 'Internal Server Error' })
          }

     }
}
