import { SignInUserDto, SignUpUserDto, LoginUserDto, RegisterUserDto } from "../dtos/auth";
import { EnvironmentSystemUserEntity, SystemUserEntity, UserEntity } from "../entities";

export abstract class AuthDatasource {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(loginSystemUserDto: SignInUserDto): Promise<EnvironmentSystemUserEntity>
     abstract signUp(registerSystemUserDto: SignUpUserDto): Promise<SystemUserEntity>

}