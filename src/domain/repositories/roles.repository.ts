import { AddRoleDto, DeleteRoleDto } from "../dtos/roles";
import { RolesEntity, DeleteRoleEntity } from "../entities";

export abstract class RolesRepository {

     abstract addRole(addRoleDto: AddRoleDto): Promise<RolesEntity>
     abstract deleteRole(registerUserDto: DeleteRoleDto): Promise<DeleteRoleEntity>

}