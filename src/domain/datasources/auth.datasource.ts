import { ChangePasswordDto, SignInUserDto, RefreshTokenDto } from "../dtos/auth";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity } from "../entities";

export abstract class AuthDatasource {

     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>
     abstract changePassword(changePasswordDto: ChangePasswordDto): Promise<ChangePasswordEntity>

}