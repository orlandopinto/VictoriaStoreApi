
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { ChangePasswordDto, LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../../domain/dtos/auth";
import { DeleteSystemUserDto } from "../../domain/dtos/auth/delete-system-user.dto";
import { RefreshTokenDto } from "../../domain/dtos/auth/refresh-token.dto";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateUserEntity, UserEntity } from "../../domain/entities";
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

     changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity> {
          return this.authDatasource.changePassword(changePasswordDto);
     }

     signUp(SignUpUserDto: SignUpUserDto): Promise<SystemUserEntity> {
          return this.authDatasource.signUp(SignUpUserDto);
     }

     deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<SystemUserEntity> {
          return this.authDatasource.deleteSystemUser(deleteSystemUserDto);
     }
}