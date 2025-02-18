import { BcryptAdapter, DURATION_TOKEN, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { EnvironmentSystemUserEntity, SystemUserEntity } from "../../domain/entities/system-user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { EnvironmentSystemUser, SignToken } from "../../domain/types";
import { SystemUserMapper } from "../mappers";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

     constructor(
          private readonly hashPassword: HashFunction = BcryptAdapter.hash,
          private readonly compareFunction: CompareFunction = BcryptAdapter.compare,
          private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
          const { email, password } = loginUserDto;
          try {

               // 1. Verificar si existe el email
               const user = await UserModel.findOne({ email }).lean()
               if (!user) {
                    throw CustomError.notFound('User not found.');
               }

               // 2. Verifica si la contraseña hace match
               if (!this.compareFunction(password, user.password)) {
                    throw CustomError.notFound('User name or password invalid.');
               }

               // 3. Mapear la respuesta a la entidad
               return UserMapper.userEntityFromObject(user);

          } catch (error) {
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
               if (error instanceof CustomError) {
                    throw error;
               }
               console.log('AuthDatasourceImpl > register > Error: ', error)
               throw CustomError.internalServerError();
          }
     }

     async signIn(loginSystemUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity> {
          //NOTE: Validar si se puede inyectar el token aqui

          let { token, email, password, EnviromentData, hasError, errorMessages } = loginSystemUserDto;

          hasError = false;
          errorMessages = []
          let errors: string[] = []
          try {

               let env: EnvironmentSystemUserEntity = { token, email, password, EnviromentData, errorMessages, hasError }

               if (!email) errors.push('Missing email')
               if (!password) errors.push('Missing password')

               // 2. Verifica si existe el usuario
               const userLogged = await SystemUserModel.findOne({ email }).lean() as unknown as EnvironmentSystemUser
               if (!userLogged) errors.push('User not found.')

               // 2. Verifica si la contraseña hace match
               if (userLogged && password && !this.compareFunction(password, userLogged.password)) {
                    errors.push('User name or password invalid.')
               }

               token = await this.signToken({ email: email }, DURATION_TOKEN) as string
               if (!token) {
                    errors.push('Error generating token')
               }

               if (errors.length === 0) {
                    userLogged.password = "***************"
                    EnviromentData = { user: userLogged }
                    env = { token, email: userLogged.email, password: "****************", EnviromentData, errorMessages, hasError }
               }
               else {
                    hasError = true;
                    errorMessages = [...errors]
               }
               return new EnvironmentSystemUserEntity(token, email, password, EnviromentData, hasError, errorMessages);

          } catch (error) {
               //NOTE: Registrar en log
               throw error;
          }
     }

     async signUp(registerUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          //NOTE: Aqui es donde se especifican todos los campos para realizar el registro del usuario
          const { email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissions } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await SystemUserModel.create({ email: email, password: this.hashPassword(password), address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles, permissions })
               await user.save();

               // 3. Mapear la respuesta a la entidad
               return SystemUserMapper.systemUserEntityFromObject(user);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               console.log('error: ', error)
               throw CustomError.internalServerError();
          }
     }

}