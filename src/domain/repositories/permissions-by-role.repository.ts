import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto } from "../dtos/permissions";
import { AddPermissionsByRoleEntity, DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleRepository {

     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity>
     abstract getPermissionsByRole(): Promise<GetPermissionsByRoleEntity>

}