import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../dtos/auth";
import { RefreshTokenDto } from "../dtos/auth/refresh-token.dto";
import { EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateUserEntity, UserEntity } from "../entities";

export abstract class AuthDatasource {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>
     abstract update(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>

}