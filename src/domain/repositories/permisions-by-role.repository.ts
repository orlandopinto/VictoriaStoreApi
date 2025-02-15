import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto } from "../dtos/roles-permissions";
import { AddPermissionsByRoleEntity, DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleRepository {

     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity>
     abstract getPermissionsByRoles(): Promise<GetPermissionsByRoleEntity>

}