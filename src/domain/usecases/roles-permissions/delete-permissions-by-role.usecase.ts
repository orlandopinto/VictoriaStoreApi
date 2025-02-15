import { DeletePermissionsByRoleDto } from "../../dtos/roles-permissions";
import { DeletePermissionsByRoleUseCase } from "../../interfaces";
import { PermissionsByRoleRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeletePermissionsByRole implements DeletePermissionsByRoleUseCase {

     constructor(private readonly rermissionsByRoleRepository: PermissionsByRoleRepository) { }

     async execute(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.rermissionsByRoleRepository.deletePermissionsByRole(deletePermissionsByRoleDto);
               if (permissionsByRole.hasError) {
                    throw new Error(permissionsByRole.message);
               }

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: permissionsByRole,
                    statusCode: 200,
                    error: null,
                    errorMessage: ""
               }
          } catch (error) {
               const err = error as Error
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    statusCode: 500,
                    error: err.stack,
                    errorMessage: err.message
               }
          }
          return resultResponse;
     }
}