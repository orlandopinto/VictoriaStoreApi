import { AddSystemUserDto } from "../dtos/systemusers/add-system-user.dto";
import { DeleteSystemUserDto } from "../dtos/systemusers/delete-system-user.dto";
import { UpdateSystemUserDto } from "../dtos/systemusers/update-system-user.dto";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddSystemUserUseCase {
     execute(addSystemUserDto: AddSystemUserDto): Promise<ApiResultResponse>
}

export interface UpdateSystemUserUseCase {
     execute(updateSystemUserDto: UpdateSystemUserDto): Promise<ApiResultResponse>
}

export interface DeleteSystemUserUseCase {
     execute(deleteSystemUserDto: DeleteSystemUserDto): Promise<ApiResultResponse>
}

export interface GetSystemUsersUseCase {
     execute(): Promise<ApiResultResponse>
}
