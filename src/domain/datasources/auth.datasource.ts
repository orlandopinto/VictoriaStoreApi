import { ChangePasswordDto, SignInUserDto, SignUpUserDto, UpdateSystemUserDto } from "../dtos/auth";
import { DeleteSystemUserDto } from "../dtos/auth/delete-system-user.dto";
import { RefreshTokenDto } from "../dtos/auth/refresh-token.dto";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateSystemUserEntity } from "../entities";

export abstract class AuthDatasource {

     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>
     abstract updateSystemUser(updateSystemUserDto: UpdateSystemUserDto): Promise<UpdateSystemUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>
     abstract changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity>
     abstract deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<SystemUserEntity>

}