import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity, UpdatePermissionsByRoleEntity } from "../../domain/entities";
import { PermissionsByRoleRepository } from "../../domain/repositories";

export class PermissionsByRoleRepositoryImpl implements PermissionsByRoleRepository {

     constructor(private readonly permissionsByRoleDatasource: PermissionsByRoleDatasource) { }

     addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.addPermissionsByRole(addPermissionsByRoleDto);
     }

     updatePermissionsByRole(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<UpdatePermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.updatePermissionsByRole(updatePermissionsByRoleDto);
     }

     getPermissionsByRole(): Promise<GetPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.getPermissionsByRole();
     }

}