import { AddRoleDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { AddRoleUseCase } from "../../interfaces/IRole";
import { RoleRepository } from "../../repositories/role.repository";
import { ApiResultResponse } from "../../types";

export class AddRole implements AddRoleUseCase {

     constructor(private readonly roleRepository: RoleRepository) { }

     async execute(addRoleDto: AddRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const role = await this.roleRepository.addRole(addRoleDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: role,
                    message: "Role created successfully",
                    statusCode: 201,
                    stackTrace: null
               }

          } catch (error) {
               const err = error as Error
               let statusCode: number = 500;
               if (error instanceof CustomError) {
                    statusCode = error.statusCode;
               }
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: err.message,
                    statusCode: statusCode,
                    stackTrace: err.stack
               }
          }
          return resultResponse;
     }
}