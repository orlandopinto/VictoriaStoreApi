import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../dtos/permissions"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddPermissionsUseCase {
     execute(addPermissionsDto: AddPermissionsDto): Promise<ApiResultResponse>
}

export interface DeletePermissionsUseCase {
     execute(deletePermissionsDto: DeletePermissionsDto): Promise<ApiResultResponse>
}

export interface GetPermissionsUseCase {
     execute(getPermissionsDto: GetPermissionsDto): Promise<ApiResultResponse>
}