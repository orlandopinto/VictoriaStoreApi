import { AddRoleDto, DeleteRoleDto, UpdateRoleDto } from "../dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity, UpdateRoleEntity } from "../entities";

export abstract class RoleRepository {

     abstract addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity>
     abstract updateRole(updateRoleDto: UpdateRoleDto): Promise<UpdateRoleEntity>
     abstract deleteRole(registerUserDto: DeleteRoleDto): Promise<DeleteRoleEntity>
     abstract getRoles(): Promise<GetRolesEntity>

}