import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { UserEntity, SystemUserEntity } from "../entities";

export abstract class AuthRepository {

     abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>
     abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
     abstract signIn(signInUserDto: SignInUserDto): Promise<SystemUserEntity>
     abstract signUp(signUpUserDto: SignUpUserDto): Promise<SystemUserEntity>

}