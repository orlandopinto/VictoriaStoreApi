import { BcryptAdapter, DURATION_REFRESH_TOKEN, DURATION_TOKEN, JwtAdapter } from "../../config";
import { AppLogger } from '../../config/appLogger';
import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../../domain/dtos/auth";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { UserEntity } from "../../domain/entities";
import { EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateUserEntity } from "../../domain/entities/system-user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { SignToken, VerifyRefreshToken } from "../../domain/types";
import { UserMapper } from "../mappers/user.mapper";
import { RefreshTokenType } from '../../domain/types/system-user.type'

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

     async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
          const { email, password } = loginUserDto;
          try {

               // 1. Verificar si existe el email
               const user = await UserModel.findOne({ email }).lean()
               if (!user) {
                    throw CustomError.notFound('User name or password invalid.');
               }

               // 2. Verifica si la contraseña hace match
               if (!this.compareFunction(password, user.password)) {
                    throw CustomError.notFound('User name or password invalid.');
               }

               // 3. Mapear la respuesta a la entidad
               return UserMapper.userEntityFromObject(user);

          } catch (error) {
               //this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

          const { name, email, password, img } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await UserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await UserModel.create({ name: name, email: email, password: this.hashPassword(password), img })
               await user.save();

               // 3. Mapear la respuesta a la entidad
               return UserMapper.userEntityFromObject(user);

          } catch (error) {
               //this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
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

     async update(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity> {
          const { id, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = updateUserDto;
          try {
               const resultUserUpdated = await SystemUserModel.findByIdAndUpdate(id, {
                    address,
                    firstName,
                    lastName,
                    phoneNumber,
                    imageProfilePath,
                    city,
                    zipcode,
                    lockoutEnabled,
                    accessFailedCount,
                    birthDate,
                    roles,
                    isActive
               }, { new: true });

               // 3. Mapear la respuesta a la entidad
               return new UpdateUserEntity(id, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive);

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

               //2. Se verifica si es válido el refresh token

               // 3. Se genera el accessToken
               //accessToken = await this.signToken({ email: email }, DURATION_TOKEN) as string
               const _refreshToken = await this.verifyRefreshToken(email, refreshToken) as unknown as RefreshTokenType
               // if (!accessToken || !refreshToken) {
               //      throw CustomError.internalServerError('Error generating token')
               // }
               // accessToken = _refreshToken?.accessToken as string;
               return new RefreshTokenEntity(_refreshToken.email, _refreshToken.accessToken, _refreshToken.refreshToken);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }

     async signUp(registerUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          //NOTE: Aqui es donde se especifican todos los campos para realizar el registro del usuario
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await SystemUserModel.create({ email: email, password: this.hashPassword(password), address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive })
               await user.save();

               // 3. Mapear la respuesta a la entidad
               return new SystemUserEntity(user.id, email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, isActive);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}