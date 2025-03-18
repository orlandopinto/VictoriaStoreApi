import { AppLogger } from "../../config/appLogger";
import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { LoginUser, RegisterUser, SignInUser, SignUpUser } from "../../domain";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { RefreshToken } from "../../domain/usecases/auth/refresh-token.usecase";

export class AuthController {

     logger: AppLogger;

     constructor(private readonly authRepository: AuthRepository) {
          this.logger = new AppLogger("AuthController");
     }

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
               this.logger.Error(error as Error);
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

     refreshToken = (req: any, res: any) => {
          const [error, refreshTokenDto] = RefreshTokenDto.refresh(req.body);
          if (error) return res.status(400).json({ error });

          new RefreshToken(this.authRepository)
               .execute(refreshTokenDto!)
               .then((data) => {
                    //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                    data.data = data.data
                    return res.json(data)
               })
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
                    this.logger.Error(error as Error);
                    res.status(500).json({ error: 'Internal Server Error' })
               });
     }

     // #endregion

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     // #endregion
}