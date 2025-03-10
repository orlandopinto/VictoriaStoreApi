import { AddPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../dtos/permissions/index";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity, UpdatePermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleDatasource {

     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract updatePermissionsByRole(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<UpdatePermissionsByRoleEntity>
     abstract getPermissionsByRole(): Promise<GetPermissionsByRoleEntity>

}