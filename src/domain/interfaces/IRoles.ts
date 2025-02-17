import { AddRoleDto, DeleteRoleDto } from "../dtos/roles-permissions/index"
import { DeleteRoleEntity } from "../entities"
import { Roles } from "../types/roles.type"

export interface AddRoleUseCase {
     execute(addRoleDto: AddRoleDto): Promise<Roles>
}

export interface DeleteRoleUseCase {
     execute(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
}