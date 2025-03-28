import { BcryptAdapter, JwtAdapter, DURATION_TOKEN, DURATION_REFRESH_TOKEN } from "../../config";
import { AppLogger } from "../../config/appLogger";
import { SystemUsersModel } from "../../data/mongodb";
import { AuthDatasource } from "../../domain/datasources";
import { SignInUserDto, RefreshTokenDto, ChangePasswordDto } from "../../domain/dtos/auth";
import { EnvironmentSystemUserEntity, SystemUserEntity, RefreshTokenEntity, ChangePasswordEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { SignToken, VerifyRefreshToken, RefreshTokenType } from "../../domain/types";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

     logger: AppLogger;

     constructor(
          private readonly hashPassword: HashFunction = BcryptAdapter.hash,
          private readonly compareFunction: CompareFunction = BcryptAdapter.compare,
          private readonly signToken: SignToken = JwtAdapter.generateToken,
          private readonly verifyRefreshToken: VerifyRefreshToken = JwtAdapter.verifyRefreshToken
     ) {
          this.logger = new AppLogger("AuthDatasourceImpl");
     }

     async signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity> {

          let { accessToken, refreshToken, email, password } = signInUserDto;

          try {
               // 1. Verifica si los campos del body son correctos
               if (!email) throw CustomError.badRequest("Missing email")
               if (!password) throw CustomError.badRequest("Missing password")
               //if (password.length < 6) throw CustomError.badRequest('Password too short')

               // 2. Verifica si existe el usuario
               let userData = await SystemUsersModel.findOne({ email }).lean() as unknown as SystemUserEntity
               if (!userData) {
                    throw CustomError.badRequest("User name or password invalid..")
               }

               // 3. Verifica si la contraseña hace match
               if (userData && password && !this.compareFunction(password, userData.password)) {
                    throw CustomError.badRequest("User name or password invalid..")
               }

               // 4. Se genera el accessToken
               accessToken = await this.signToken({ email: email }, DURATION_TOKEN) as string
               refreshToken = await this.signToken({ email: email }, DURATION_REFRESH_TOKEN) as string
               if (!accessToken || !refreshToken) {
                    throw CustomError.internalServerError('Error generating token')
               }

               return new EnvironmentSystemUserEntity(accessToken, refreshToken, userData);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }

     async refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity> {
          let { email, refreshToken } = refreshTokenDto;

          try {
               // 1. Verifica si los campos del body son correctos
               if (!email) throw CustomError.badRequest("Missing email")
               if (!refreshToken) throw CustomError.badRequest("Missing refreshToken")

               // 2. Se genera el accessToken y resfreshToken
               const _refreshToken = await this.verifyRefreshToken(email, refreshToken) as unknown as RefreshTokenType

               return new RefreshTokenEntity(_refreshToken.email, _refreshToken.accessToken, _refreshToken.refreshToken);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }

     async changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity> {
          const { email, newPassword } = changePasswordDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUsersModel.findOne({ email: email })
               if (!exists) throw CustomError.badRequest('User does not exists.')

               // 2. Hash de contraseña
               const user = await SystemUsersModel.findOneAndUpdate(
                    { email: email },
                    { $set: { password: this.hashPassword(newPassword) } }
               )

               // 3. Mapear la respuesta a la entidad
               return new ChangePasswordEntity(email, "************************");

          } catch (error) {
               //this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}