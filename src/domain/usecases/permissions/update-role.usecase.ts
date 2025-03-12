import { UpdateRoleDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { UpdateRoleUseCase } from "../../interfaces/IRole";
import { RoleRepository } from "../../repositories/role.repository";
import { ApiResultResponse } from "../../types";

export class UpdateRole implements UpdateRoleUseCase {

     constructor(private readonly roleRepository: RoleRepository) { }

     async execute(updateRoleDto: UpdateRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const role = await this.roleRepository.updateRole(updateRoleDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: role,
                    message: "Role updated successfully",
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