import { ChangePasswordDto, LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../dtos/auth";
import { DeleteSystemUserDto } from "../dtos/auth/delete-system-user.dto";
import { RefreshTokenDto } from "../dtos/auth/refresh-token.dto";
import { ChangePasswordEntity, EnvironmentSystemUserEntity, RefreshTokenEntity, SystemUserEntity, UpdateUserEntity, UserEntity } from "../entities";

export abstract class AuthRepository {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>
     abstract update(updateUserDto: UpdateUserDto): Promise<UpdateUserEntity>
     abstract refresh(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenEntity>
     abstract changePassword(refreshTokenDto: ChangePasswordDto): Promise<ChangePasswordEntity>
     abstract deleteSystemUser(deleteSystemUserDto: DeleteSystemUserDto): Promise<SystemUserEntity>

}