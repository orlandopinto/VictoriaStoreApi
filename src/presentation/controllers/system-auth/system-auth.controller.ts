import { AppLogger } from "../../../config/appLogger";
import { SignInUser, RefreshToken } from "../../../domain";
import { SignInUserDto, RefreshTokenDto, ChangePasswordDto } from "../../../domain/dtos/auth";
import { CustomError } from "../../../domain/errors/custom.error";
import { AuthRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { ChangePassword } from "../../../domain/usecases/auth/change-password.usecase";

export class SystemAuthController {

     logger: AppLogger;

     constructor(private readonly authRepository: AuthRepository) {
          this.logger = new AppLogger("AuthController");
     }

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

}