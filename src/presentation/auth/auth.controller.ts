import { AppLogger } from "../../config/appLogger";
import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { LoginUser, RegisterUser, SignInUser, SignUpUser } from "../../domain";
import { ChangePasswordDto, LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../../domain/dtos/auth";
import { DeleteSystemUserDto } from "../../domain/dtos/auth/delete-system-user.dto";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { ApiResultResponse } from "../../domain/types";
import { ChangePassword } from "../../domain/usecases/auth/change-password.usecase";
import { DeleteSystemUser } from "../../domain/usecases/auth/delete-system-user.usecase";
import { RefreshToken } from "../../domain/usecases/auth/refresh-token.usecase";
import { UpdateUser } from "../../domain/usecases/auth/update-user.usecase";

export class AuthController {

     logger: AppLogger;

     constructor(private readonly authRepository: AuthRepository) {
          this.logger = new AppLogger("AuthController");
     }

     // #region PUBLIC FUNCTIONS

     loginUser = (req: any, res: any) => {
          const [error, loginUserDto] = LoginUserDto.login(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

          new LoginUser(this.authRepository)
               .execute(loginUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     registerUser = (req: any, res: any) => {
          const [error, registerUserDto] = RegisterUserDto.create(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

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
          if (error) {
               return this.handleCustomError(error, res);
          }

          new SignInUser(this.authRepository)
               .execute(signInUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     refreshToken = (req: any, res: any) => {
          const [error, refreshTokenDto] = RefreshTokenDto.refresh(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

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
          if (error) {
               return this.handleCustomError(error, res);
          }

          new SignUpUser(this.authRepository)
               .execute(signUpUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     update = (req: any, res: any) => {
          const [error, updateUserDto] = UpdateUserDto.create(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

          new UpdateUser(this.authRepository)
               .execute(updateUserDto!)
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

     changePassword = (req: any, res: any) => {
          const [error, changePasswordDto] = ChangePasswordDto.change(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

          new ChangePassword(this.authRepository)
               .execute(changePasswordDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     deleteSystemUser = (req: any, res: any) => {
          const [error, deleteSystemUserDto] = DeleteSystemUserDto.delete(req.body);
          if (error) {
               return this.handleCustomError(error, res);
          }

          new DeleteSystemUser(this.authRepository)
               .execute(deleteSystemUserDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleEror(error, res));
     }

     // #endregion

     // #region PRIVATE FUNCTIONS

     private handleEror = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               return res.status(error.statusCode).json({ error: error.message })
          }
          return res.status(500).json({ error: 'Internal Server Error' })
     }

     private handleCustomError(error: string, res: any) {
          const resultResponse: ApiResultResponse = {
               status: "error",
               hasError: true,
               data: null,
               message: error,
               statusCode: 400,
               stackTrace: null
          };

          return res.status(400).json(resultResponse);
     }
     // #endregion
}