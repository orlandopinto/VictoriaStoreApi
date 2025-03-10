import { AddPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity, UpdatePermissionsByRoleEntity } from "../entities";

export abstract class PermissionsByRoleRepository {

     abstract addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity>
     abstract updatePermissionsByRole(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<UpdatePermissionsByRoleEntity>
     abstract getPermissionsByRole(): Promise<GetPermissionsByRoleEntity>

}