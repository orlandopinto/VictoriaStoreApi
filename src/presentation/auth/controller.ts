import { Request, Response } from "express";
import { UserModel } from "../../data/mongodb";
import { AuthRepository, CustomError, LoginUserDto, LoginUser, RegisterUser, RegisterUserDto } from "../../domain";

export class AuthController {

     constructor(private readonly authRepository: AuthRepository) { }

     // #region PUBLIC FUNCTIONS

     loginUser = (req: Request, res: Response) => {
          const [error, loginUserDto] = LoginUserDto.login(req.body);
          if (error) return res.status(400).json({ error });

          new LoginUser(this.authRepository)
               .execute(loginUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     registerUser = (req: Request, res: Response) => {

          const [error, registerUserDto] = RegisterUserDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new RegisterUser(this.authRepository)
               .execute(registerUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     getUsers = (req: Request, res: Response) => {
          UserModel.find()
               .then(users => res.json({
                    //users,
                    user: req.body.user
               }))
               .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
     }

     // #endregion

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: Response) => {
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          console.log(error)
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     // #endregion
}