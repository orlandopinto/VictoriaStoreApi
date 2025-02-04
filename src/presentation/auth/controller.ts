import { Request, Response } from "express"
import { AuthRepository, RegisterUserDto } from "../../domain";

export class AuthController {

     constructor(private readonly authRepository: AuthRepository) { }

     loginUser = (req: Request, res: Response) => {
          res.json(req.body)
     }

     registerUser = (req: Request, res: Response) => {
          
          const [error, registerUserDto] = RegisterUserDto.create(req.body);

          if (error) res.status(400).json({ error });

          this.authRepository.register(registerUserDto!)
               .then(user => res.json(user))
               .catch(error => res.status(500).json(error))
     }
}