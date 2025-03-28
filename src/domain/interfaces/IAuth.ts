import { ChangePasswordDto, RefreshTokenDto, SignInUserDto, SignUpUserDto, UpdateSystemUserDto } from "../dtos/auth";
import { DeleteSystemUserDto } from "../dtos/auth/delete-system-user.dto";
import { ApiResultResponse } from "../types";

export interface SignInUserUseCase {
     execute(signInUserDto: SignInUserDto): Promise<ApiResultResponse>
}

export interface UpdateSystemUserUseCase {
     execute(updateSystemUserDto: UpdateSystemUserDto): Promise<ApiResultResponse>
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