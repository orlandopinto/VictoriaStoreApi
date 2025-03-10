import { AddPermissionsByRoleDto, GetPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../dtos/permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddPermissionsByRoleUseCase {
     execute(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<ApiResultResponse>
}

export interface UpdatePermissionsByRoleUseCase {
     execute(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<ApiResultResponse>
}

export interface GetPermissionsUseCase {
     execute(getPermissionsByRoleDto: GetPermissionsByRoleDto): Promise<ApiResultResponse>
}