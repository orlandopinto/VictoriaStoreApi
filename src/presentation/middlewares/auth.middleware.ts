import { NextFunction } from "express";
import { JwtAdapter } from "../../config";

export default class AuthMiddleware {

     static validateJWT = async (req: any, res: any, next: NextFunction) => {

          try {
               await JwtAdapter.validateToken(req, res, next)

          } catch (error) {
               res.status(500).json({ error: 'Internal Server Error' })
          }

     }

}
