import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { LoginUser, RegisterUser, SignInUser, SignUpUser } from "../../domain";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthController {

     constructor(private readonly authRepository: AuthRepository) { }

     // #region PUBLIC FUNCTIONS

     loginUser = (req: any, res: any) => {
          // if (!req.body || typeof req.body !== 'object') {
          //      return res.status(400).json({ error: 'Invalid request body' });
          // }
          const [error, loginUserDto] = LoginUserDto.login(req.body);
          if (error) return res.status(400).json({ error });

          new LoginUser(this.authRepository)
               .execute(loginUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     registerUser = (req: any, res: any) => {
          const [error, registerUserDto] = RegisterUserDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new RegisterUser(this.authRepository)
               .execute(registerUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     getUsers = (req: any, res: any) => {
          try {
               UserModel.find()
                    .then(data => res.json({ data }))
                    .catch(error => this.handleEror(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     // CUENTAS DEL SISTEMA
     signIn = (req: any, res: any) => {
          const [error, signInUserDto] = SignInUserDto.signIn(req.body);
          if (error) return res.status(400).json({ error });

          new SignInUser(this.authRepository)
               .execute(signInUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     signUp = (req: any, res: any) => {
          const [error, signUpUserDto] = SignUpUserDto.create(req.body);
          if (error) return res.status(400).json({ error });

          new SignUpUser(this.authRepository)
               .execute(signUpUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     getSystemUsers = (req: any, res: any) => {
          SystemUserModel.find()
               .then(users => {
                    const data = [...users];
                    data.map((usr) => {
                         usr.password = "********************"
                    })
                    res.json(data)
               })
               .catch((error) => {
                    // console.log('respuesta: ', res)
                    // console.log('status code: ', res.statusCode)
                    // console.log('error: ', error) //posiblemente caduque el token
                    console.log('error: ', error)
                    res.status(500).json({ error: 'Internal Server Error' })
               });
     }

     // #endregion

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          console.log('handleEror: ', error)
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     // #endregion
}