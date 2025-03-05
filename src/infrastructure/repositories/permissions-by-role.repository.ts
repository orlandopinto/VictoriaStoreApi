import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { PermissionsByRoleRepository } from "../../domain/repositories";

export class PermissionsByRoleRepositoryImpl implements PermissionsByRoleRepository {

     constructor(private readonly permissionsByRoleDatasource: PermissionsByRoleDatasource) { }

     addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.addPermissionsByRole(addPermissionsByRoleDto);
     }

     getPermissionsByRole(): Promise<GetPermissionsByRoleEntity> {
          return this.permissionsByRoleDatasource.getPermissionsByRole();
     }

}