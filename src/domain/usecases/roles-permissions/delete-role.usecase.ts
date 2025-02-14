import { DeleteRoleDto } from "../../dtos/roles-permissions";
import { DeleteRoleEntity } from "../../entities";
import { DeleteRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";

export class DeleteRole implements DeleteRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository) { }

     async execute(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {

          const role = await this.roleRepository.deleteRole(deleteRoleDto);

          return {
               roleName: role.roleName,
               message: role.message
          }
     }
}