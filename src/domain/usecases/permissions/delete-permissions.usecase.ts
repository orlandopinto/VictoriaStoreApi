import { DeletePermissionsDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { DeletePermissionsUseCase } from "../../interfaces/IPermissions";
import { PermissionsRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeletePermissions implements DeletePermissionsUseCase {

     constructor(private readonly rermissionsByRoleRepository: PermissionsRepository) { }

     async execute(deletePermissionsDto: DeletePermissionsDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissions = await this.rermissionsByRoleRepository.deletePermissions(deletePermissionsDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: permissions,
                    message: "Permission deleted successfully.",
                    statusCode: 200,
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