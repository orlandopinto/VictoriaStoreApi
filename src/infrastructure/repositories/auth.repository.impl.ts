
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../../domain/dtos/auth";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateUserEntity, UserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

     constructor(private readonly authDatasource: AuthDatasource) { }

     login(loginUserDto: LoginUserDto): Promise<UserEntity> {
          return this.authDatasource.login(loginUserDto);
     }

     register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
          return this.authDatasource.register(registerUserDto);
     }

     signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity> {
          return this.authDatasource.signIn(signInUserDto);
     }

     update(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity> {
          return this.authDatasource.update(updateUserDto);
     }

     refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity> {
          return this.authDatasource.refresh(refreshTokenDto);
     }

     signUp(SignUpUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          return this.authDatasource.signUp(SignUpUserDto);
     }
}