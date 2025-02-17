import { DURATION_TOKEN, JwtAdapter } from "../../../config";
import { AddRoleDto } from "../../dtos/roles-permissions";
import { CustomError } from "../../errors/custom.error";
import { AddRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";
import { SignToken } from "../../types";
import { Roles } from "../../types/roles.type";

export class AddRole implements AddRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(addRoleDto: AddRoleDto): Promise<Roles> {

          // Add Role
          const role = await this.roleRepository.addRole(addRoleDto);

          // Token
          const token = await this.signToken({ id: role.id }, DURATION_TOKEN)
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          return {
               role: {
                    _id: role.id,
                    roleName: role.roleName
               }
          }
     }
}