import { AddRoleDto, DeleteRoleDto } from "../dtos/permissions/index";
import { DeleteRoleEntity, GetRolesEntity, RolesEntity } from "../entities";

export abstract class RoleDatasource {

     abstract addRole(addRoleDto: AddRoleDto): Promise<RolesEntity>
     abstract deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}