import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto, GetPermissionsByRoleDto } from "../dtos/permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddPermissionsByRoleUseCase {
     execute(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<ApiResultResponse>
}

// export interface DeletePermissionsByRoleUseCase {
//      execute(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<ApiResultResponse>
// }

export interface GetPermissionsUseCase {
     execute(getPermissionsByRoleDto: GetPermissionsByRoleDto): Promise<ApiResultResponse>
}