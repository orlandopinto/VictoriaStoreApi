import { JwtAdapter } from "../../../config";
import { DeleteRoleDto } from "../../dtos/roles";
import { DeleteRoleEntity } from "../../entities";
import { DeleteRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";
import { SignToken } from "../../types/auth.types";

export class DeleteRole implements DeleteRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {

          // Delete Role
          const role = await this.roleRepository.deleteRole(deleteRoleDto);

          return {
               roleName: role.roleName,
               message: role.message
          }
     }
}