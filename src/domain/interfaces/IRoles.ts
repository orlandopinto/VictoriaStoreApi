import { AddRoleDto, DeleteRoleDto } from "../dtos/roles-permissions/index"
import { ApiResultResponse } from "../types"

export interface AddRoleUseCase {
     execute(addRoleDto: AddRoleDto): Promise<ApiResultResponse>
}

export interface DeleteRoleUseCase {
     execute(deleteRoleDto: DeleteRoleDto): Promise<ApiResultResponse>
}