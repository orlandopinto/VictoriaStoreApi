import { LoginUserDto, RegisterUserDto, SignInUserDto, SignUpUserDto } from "../dtos/auth";
import { ApiResultResponse, SystemUser } from "../types";
import { UserToken } from "../types/auth.type";

export interface LoginUserUseCase {
     execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

export interface RegisterUserUseCase {
     execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

export interface SignInUserUseCase {
     execute(signInUserDto: SignInUserDto): Promise<ApiResultResponse>
}

export interface SignUpUserUseCase {
     execute(signUpUserDto: SignUpUserDto): Promise<SystemUser>
}