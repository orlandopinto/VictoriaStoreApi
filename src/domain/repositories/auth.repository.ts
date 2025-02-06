import { SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { SystemUserEntity } from "../entities/system-user.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(signInUserDto: SignInUserDto): Promise<SystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>

}