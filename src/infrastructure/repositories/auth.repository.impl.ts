import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { SignInUserDto, SignUpUserDto } from "../../domain/dtos/auth";
import { SystemUserEntity } from "../../domain/entities/system-user.entity";

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