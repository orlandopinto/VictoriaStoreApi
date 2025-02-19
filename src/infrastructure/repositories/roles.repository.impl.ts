import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { AddRoleDto, DeleteRoleDto } from "../../domain/dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, RolesEntity } from "../../domain/entities/roles.entity";
import { RolesRepository } from "../../domain/repositories/roles.repository";

export class RolesRepositoryImpl implements RolesRepository {

     constructor(private readonly roleDatasource: RoleDatasource) { }

     addRole(addRoleDto: AddRoleDto): Promise<RolesEntity> {
          return this.roleDatasource.addRole(addRoleDto);
     }

     deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {
          return this.roleDatasource.deleteRole(deleteRoleDto);
     }

     getRoles(): Promise<GetRolesEntity> {
          return this.roleDatasource.getRoles();
     }

}