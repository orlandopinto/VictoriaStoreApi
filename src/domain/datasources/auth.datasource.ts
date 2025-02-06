import { SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { SystemUserEntity } from "../entities/system-user.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(loginSystemUserDto: SignInUserDto): Promise<SystemUserEntity>
     abstract signUp(registerSystemUserDto: SignUpUserDto): Promise<SystemUserEntity>

}