import { ChangePasswordDto, LoginUserDto, RefreshTokenDto, RegisterUserDto, SignInUserDto, SignUpUserDto, UpdateUserDto } from "../dtos/auth";
import { DeleteSystemUserDto } from "../dtos/auth/delete-system-user.dto";
import { ApiResultResponse } from "../types";
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

export interface UpdateUserUseCase {
     execute(updateUserDto: UpdateUserDto): Promise<ApiResultResponse>
}

export interface RefreshTokenUseCase {
     execute(refreshTokenDto: RefreshTokenDto): Promise<ApiResultResponse>
}

export interface SignUpUserUseCase {
     execute(signUpUserDto: SignUpUserDto): Promise<ApiResultResponse>
}

export interface ChangePasswordUseCase {
     execute(changePasswordDto: ChangePasswordDto): Promise<ApiResultResponse>
}

export interface DeleteSystemUserUseCase {
     execute(deleteSystemUserDto: DeleteSystemUserDto): Promise<ApiResultResponse>
}