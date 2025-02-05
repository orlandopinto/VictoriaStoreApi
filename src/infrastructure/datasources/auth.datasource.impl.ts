import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

     constructor(
          private readonly hashPassword: HashFunction = BcryptAdapter.hash,
          private readonly compareFunction: CompareFunction = BcryptAdapter.compare
     ) {}

     async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

          const { name, email, password } = registerUserDto;
          try {
               // 1. verificar si el correo existe
               const exists = await UserModel.findOne({ email: email })
               if (exists) throw CustomError.badRequest('User already exists.')

               // 2. Hash de contraseña
               const user = await UserModel.create({ name: name, email: email, password: this.hashPassword(password) })
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

}