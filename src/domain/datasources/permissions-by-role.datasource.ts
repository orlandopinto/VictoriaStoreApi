import { AddPermissionsByRoleDto } from "../dtos/permissions/index";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleDatasource {

     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract getPermissionsByRole(): Promise<GetPermissionsByRoleEntity>

}