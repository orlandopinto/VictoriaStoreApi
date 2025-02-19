import { AddRoleDto } from "../../dtos/permissions";
import { AddRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";
import { ApiResultResponse } from "../../types";

export class AddRole implements AddRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository) { }

     async execute(addRoleDto: AddRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const role = await this.roleRepository.addRole(addRoleDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: role,
                    message: "Role created successfully",
                    statusCode: 200,
                    stackTrace: null,
                    errorMessage: null
               }

          } catch (error) {
               const err = error as Error
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: null,
                    statusCode: 500,
                    stackTrace: err.stack,
                    errorMessage: err.message
               }
          }
          return resultResponse;
     }
}