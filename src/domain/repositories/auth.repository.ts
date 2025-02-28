import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { EnvironmentSystemUserEntity, SystemUserEntity, UserEntity } from "../entities";

export abstract class AuthRepository {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(signInUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>

}