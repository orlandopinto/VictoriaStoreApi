import { AddRoleDto, DeleteRoleDto } from "../dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity } from "../entities";

export abstract class RolesRepository {

     abstract addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity>
     abstract deleteRole(registerUserDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}