import { AddRoleDto, DeleteRoleDto, UpdateRoleDto } from "../dtos/permissions/index";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity, UpdateRoleEntity } from "../entities";

export abstract class RoleDatasource {

     abstract addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity>
     abstract updateRole(updateRoleDto: UpdateRoleDto): Promise<UpdateRoleEntity>
     abstract deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}