import { Request, Response } from "express"

export class AuthController {

     constructor() {

     }

     loginUser = (req: Request, res: Response) => {
          res.json('loginUser Controller')
     }

     registerUser = (req: Request, res: Response) => {
          res.json('registerUser Controller')
     }
}