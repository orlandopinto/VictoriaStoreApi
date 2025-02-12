import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { SystemUserModel } from "../../data/mongodb/models/system-user.model";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { SystemUserEntity } from "../../domain/entities/system-user.entity";
import { SystemUserMapper } from "../mappers/system-user.mapper";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

     constructor(
          private readonly hashPassword: HashFunction = BcryptAdapter.hash,
          private readonly compareFunction: CompareFunction = BcryptAdapter.compare
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

               // 3. Mapear la respuesta a nuestra entidadad
               //console.log('user: ', user)
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

               // 3. Mapear la respuesta a nuestra entidadad
               return UserMapper.userEntityFromObject(user);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async signIn(loginSystemUserDto: SignInUserDto): Promise<SystemUserEntity> {
          const { email, password } = loginSystemUserDto;
          try {

               // 1. Verificar si existe el email
               const user = await SystemUserModel.findOne({ email }).lean()
               if (!user) {
                    throw CustomError.notFound('User not found.');
               }

               // 2. Verifica si la contraseña hace match
               if (!this.compareFunction(password, user.password)) {
                    throw CustomError.notFound('User name or password invalid.');
               }

               // 3. Mapear la respuesta a nuestra entidadad
               return SystemUserMapper.systemUserEntityFromObject(user);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async signUp(registerUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          //TODO: Aqui es donde se especifican todos los campos para realizar el registro del usuario
          const { userName, email, password, address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await SystemUserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await SystemUserModel.create({ userName: userName, email: email, password: this.hashPassword(password), address, firstName, lastName, phoneNumber, imageProfilePath, city, zipcode, lockoutEnabled, accessFailedCount, birthDate, roles })
               await user.save();

               // 3. Mapear la respuesta a nuestra entidadad
               return SystemUserMapper.systemUserEntityFromObject(user);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}