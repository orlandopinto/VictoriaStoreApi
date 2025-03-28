import { ChangePasswordDto, RefreshTokenDto, SignInUserDto } from "../dtos/auth";
import { ApiResultResponse } from "../types";

export interface SignInUserUseCase {
     execute(signInUserDto: SignInUserDto): Promise<ApiResultResponse>
}

export interface RefreshTokenUseCase {
     execute(refreshTokenDto: RefreshTokenDto): Promise<ApiResultResponse>
}

export interface ChangePasswordUseCase {
     execute(changePasswordDto: ChangePasswordDto): Promise<ApiResultResponse>
}