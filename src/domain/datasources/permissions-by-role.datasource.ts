import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto, GetPermissionsByRolesDto } from "../dtos/roles-permissions/index";
import { DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity, AddPermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleDatasource {

     //TODO: Modificar addPermissionsByRole y getPermissionsByRoles, para que devuelva
     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity>
     abstract getPermissionsByRoles(): Promise<GetPermissionsByRoleEntity>

}