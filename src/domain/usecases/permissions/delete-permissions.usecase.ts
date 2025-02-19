import { DeletePermissionsDto } from "../../dtos/permissions";
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