import { AddRoleDto, DeleteRoleDto, UpdateRoleDto } from "../dtos/permissions/index";
import { ApiResultResponse } from "../types";

export interface AddRoleUseCase {
     execute(addRoleDto: AddRoleDto): Promise<ApiResultResponse>
}

export interface UpdateRoleUseCase {
     execute(updateRoleDto: UpdateRoleDto): Promise<ApiResultResponse>
}

export interface DeleteRoleUseCase {
     execute(deleteRoleDto: DeleteRoleDto): Promise<ApiResultResponse>
}

export interface GetRolesUseCase {
     execute(): Promise<ApiResultResponse>
}