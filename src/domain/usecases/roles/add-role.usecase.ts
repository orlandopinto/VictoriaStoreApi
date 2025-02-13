import { JwtAdapter } from "../../../config";
import { AddRoleDto } from "../../dtos/roles";
import { CustomError } from "../../errors/custom.error";
import { AddRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";
import { SignToken } from "../../types/auth.types";
import { RoleToken } from "../../types/roles.types";

export class AddRole implements AddRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(addRoleDto: AddRoleDto): Promise<RoleToken> {

          // Add Role
          const role = await this.roleRepository.addRole(addRoleDto);

          // Token
          const token = await this.signToken({ id: role.id }, '2h')
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          return {
               token: token,
               role: {
                    id: role.id,
                    roleName: role.roleName
               }
          }
     }
}