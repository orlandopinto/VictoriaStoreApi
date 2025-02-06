import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { SystemUserToken, UserToken } from "../types/auth.types";

export interface LoginUserUseCase {
     execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export interface RegisterUserUseCase {
     execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export interface SignInUserUseCase {
     execute(signInUserDto: SignInUserDto): Promise<SystemUserToken>
}

export interface SignUpUserUseCase {
     execute(signUpUserDto: SignUpUserDto): Promise<SystemUserToken>
}