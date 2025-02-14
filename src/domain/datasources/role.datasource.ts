import { AddRoleDto, DeleteRoleDto } from "../dtos/roles-permissions/index";
import { DeleteRoleEntity, RolesEntity } from "../entities";

export abstract class RoleDatasource {

     abstract addRole(addRoleDto: AddRoleDto): Promise<RolesEntity>
     abstract deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity>

}