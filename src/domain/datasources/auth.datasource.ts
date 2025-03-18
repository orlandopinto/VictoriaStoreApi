import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { RefreshTokenDto } from "../dtos/auth/refresh-token.dto";
import { EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UserEntity } from "../entities";

export abstract class AuthDatasource {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(loginSystemUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(registerSystemUserDto: SignUpUserDto): Promise<SystemUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>

}