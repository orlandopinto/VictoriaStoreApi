import { AddPermissionsByRoleDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { AddPermissionsByRoleUseCase } from "../../interfaces";
import { PermissionsByRoleRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddPermissionsByRole implements AddPermissionsByRoleUseCase {

     constructor(private readonly permissionsRepository: PermissionsByRoleRepository) { }

     async execute(addPermissionsDto: AddPermissionsByRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.permissionsRepository.addPermissionsByRole(addPermissionsDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: permissionsByRole,
                    message: "Permission created successfully",
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