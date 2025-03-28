import { AuthDatasource } from "../../domain/datasources";
import { SignInUserDto, RefreshTokenDto, ChangePasswordDto } from "../../domain/dtos/auth";
import { EnvironmentSystemUserEntity, RefreshTokenEntity, ChangePasswordEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories";

export class AuthRepositoryImpl implements AuthRepository {

     constructor(private readonly authDatasource: AuthDatasource) { }

     signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity> {
          return this.authDatasource.signIn(signInUserDto);
     }

     refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity> {
          return this.authDatasource.refresh(refreshTokenDto);
     }

     changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity> {
          return this.authDatasource.changePassword(changePasswordDto);
     }

}