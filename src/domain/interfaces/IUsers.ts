import { AddUserDto } from "../../domain/dtos/users/add-user.dto";
import { DeleteUserDto } from "../../domain/dtos/users/delete-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddUserUseCase {
     execute(addUserDto: AddUserDto): Promise<ApiResultResponse>
}

export interface UpdateUserUseCase {
     execute(updateUserDto: UpdateUserDto): Promise<ApiResultResponse>
}

export interface DeleteUserUseCase {
     execute(deleteUserDto: DeleteUserDto): Promise<ApiResultResponse>
}

export interface GetUsersUseCase {
     execute(): Promise<ApiResultResponse>
}
