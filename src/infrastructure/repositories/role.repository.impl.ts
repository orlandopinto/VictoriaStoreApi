import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { AddRoleDto, DeleteRoleDto } from "../../domain/dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity } from "../../domain/entities/role.entity";
import { RoleRepository } from "../../domain/repositories/role.repository";

export class RoleRepositoryImpl implements RoleRepository {

     constructor(private readonly roleDatasource: RoleDatasource) { }

     addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity> {
          return this.roleDatasource.addRole(addRoleDto);
     }

     deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {
          return this.roleDatasource.deleteRole(deleteRoleDto);
     }

     getRoles(): Promise<GetRolesEntity> {
          return this.roleDatasource.getRoles();
     }

}