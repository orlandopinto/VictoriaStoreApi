import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto } from "../../domain/dtos/roles-permissions";
import { AddPermissionsByRoleEntity, DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { PermissionsByRoleRepository } from "../../domain/repositories";

export class PermissionsByRolesRepositoryImpl implements PermissionsByRoleRepository {

     constructor(private readonly permissionsByRoleDatasource: PermissionsByRoleDatasource) { }

     addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.addPermissionsByRole(addPermissionsByRoleDto);
     }

     deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.deletePermissionsByRole(deletePermissionsByRoleDto);
     }

     getPermissionsByRoles(): Promise<GetPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.getPermissionsByRoles();
     }

}