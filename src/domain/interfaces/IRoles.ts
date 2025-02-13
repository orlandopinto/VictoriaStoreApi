import { AddRoleDto, DeleteRoleDto } from "../dtos/roles/index"
import { DeleteRoleEntity } from "../entities"
import { RoleToken } from "../types/roles.types"

export interface AddRoleUseCase {
     execute(addRoleDto: AddRoleDto): Promise<RoleToken>
}

export interface DeleteRoleUseCase {
     execute(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
}