import { AddRoleDto, DeleteRoleDto } from "../dtos/permissions/index";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity } from "../entities";

export abstract class RoleDatasource {

     abstract addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity>
     abstract deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}