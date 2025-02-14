import { AddRoleDto, DeleteRoleDto } from "../dtos/roles-permissions/index"
import { DeleteRoleEntity } from "../entities"
import { RoleToken } from "../types/roles.type"

export interface AddRoleUseCase {
     execute(addRoleDto: AddRoleDto): Promise<RoleToken>
}

export interface DeleteRoleUseCase {
     execute(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
}