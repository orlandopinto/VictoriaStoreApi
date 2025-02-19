import { AddRoleDto, DeleteRoleDto } from "../dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, RolesEntity } from "../entities";

export abstract class RolesRepository {

     abstract addRole(addRoleDto: AddRoleDto): Promise<RolesEntity>
     abstract deleteRole(registerUserDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}