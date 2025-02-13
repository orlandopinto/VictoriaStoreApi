
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { SystemUserEntity, UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

     constructor(private readonly authDatasource: AuthDatasource) { }

     login(loginUserDto: LoginUserDto): Promise<UserEntity> {
          return this.authDatasource.login(loginUserDto);
     }

     register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
          return this.authDatasource.register(registerUserDto);
     }

     signIn(signInUserDto: SignInUserDto): Promise<SystemUserEntity> {
          return this.authDatasource.signIn(signInUserDto);
     }

     signUp(SignUpUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          return this.authDatasource.signUp(SignUpUserDto);
     }
}