import { UpdatePermissionsByRoleDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { UpdatePermissionsByRoleUseCase } from "../../interfaces";
import { PermissionsByRoleRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class UpdatePermissionsByRole implements UpdatePermissionsByRoleUseCase {

     constructor(private readonly permissionsRepository: PermissionsByRoleRepository) { }

     async execute(updatePermissionsDto: UpdatePermissionsByRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.permissionsRepository.updatePermissionsByRole(updatePermissionsDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: permissionsByRole,
                    message: "Permission updated successfully",
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