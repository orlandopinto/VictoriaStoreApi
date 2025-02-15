import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto, GetPermissionsByRolesDto } from "../dtos/roles-permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddPermissionsByRoleUseCase {
     execute(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<ApiResultResponse>
}

export interface DeletePermissionsByRoleUseCase {
     execute(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<ApiResultResponse>
}

export interface GetPermissionsByRoleUseCase {
     get(getPermissionsByRoleDto: GetPermissionsByRolesDto): Promise<ApiResultResponse>
}