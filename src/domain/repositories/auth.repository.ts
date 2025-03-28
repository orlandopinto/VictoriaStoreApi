import { ChangePasswordDto, SignInUserDto } from "../dtos/auth";
import { RefreshTokenDto } from "../dtos/auth/refresh-token.dto";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity } from "../entities";

export abstract class AuthRepository {

     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>
     abstract changePassword(refreshTokenDto: ChangePasswordDto): Promise<ChangePasswordEntity>

}