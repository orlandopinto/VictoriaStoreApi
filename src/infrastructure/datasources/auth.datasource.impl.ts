import { BcryptAdapter, DURATION_REFRESH_TOKEN, DURATION_TOKEN, JwtAdapter } from "../../config";
import { AppLogger } from '../../config/appLogger';
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { ChangePasswordDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../../domain/dtos/auth";
import { DeleteSystemUserDto } from "../../domain/dtos/auth/delete-system-user.dto";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateSystemUserEntity } from "../../domain/entities/system-user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { SignToken, VerifyRefreshToken } from "../../domain/types";
import { RefreshTokenType } from '../../domain/types/system-user.type';
import { CloudinaryController } from "../../presentation/controllers/adapters/cloudinary.controller";

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
               let userData = await SystemUserModel.findOne({ email }).lean() as unknown as SystemUserEntity
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

     async update(updateUserDto: UpdateUserDto): Promise<UpdateSystemUserEntity> {
          const { id, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = updateUserDto;
          try {
               const resultUserUpdated = await SystemUserModel.findByIdAndUpdate(id, {
                    address,
                    firstName,
                    lastName,
                    phoneNumber,
                    secure_url,
                    city,
                    zipcode,
                    lockoutEnabled,
                    accessFailedCount,
                    birthDate,
                    roles,
                    isActive
               }, { new: true });

               // 3. Mapear la respuesta a la entidad
               return new UpdateSystemUserEntity(id, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive, resultUserUpdated?.createdAt as unknown as string, resultUserUpdated?.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
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

     async signUp(registerUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          //NOTE: Aqui es donde se especifican todos los campos para realizar el registro del usuario
          const { email, password, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await SystemUserModel.create({ email: email, password: this.hashPassword(password), address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive })
               await user.save();

               // 3. Mapear la respuesta a la entidad
               return new SystemUserEntity(user.id, email, password, address, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive, user.createdAt as unknown as string, user.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity> {
          const { email, newPassword } = changePasswordDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUserModel.findOne({ email: email })
               if (!exists) throw CustomError.badRequest('User does not exists.')

               // 2. Hash de contraseña
               const user = await SystemUserModel.findOneAndUpdate(
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

     async deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<SystemUserEntity> {
          const { _id } = deleteSystemUserDto;
          try {
               // 1. verificar si el correo existe
               const foundUser = await SystemUserModel.findOne({ _id: _id })
               if (!foundUser) throw CustomError.badRequest('User does not exists.')

               // 2. Hash de contraseña
               await SystemUserModel.deleteOne({ _id: _id });

               const controller = new CloudinaryController();
               controller.deleteMediaFile(foundUser.public_id);

               // 3. Mapear la respuesta a la entidad
               return new SystemUserEntity(_id, foundUser.email, foundUser.password, foundUser.address, foundUser.firstName, foundUser.lastName, foundUser.phoneNumber, foundUser.public_id, foundUser.secure_url, foundUser.city, foundUser.zipcode, foundUser.lockoutEnabled, foundUser.accessFailedCount, foundUser.birthDate, foundUser.roles, foundUser.isActive, foundUser.createdAt as unknown as string, undefined);

          } catch (error) {
               //this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }


}