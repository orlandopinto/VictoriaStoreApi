import { AddPermissionsByRoleDto } from "../../dtos/roles-permissions";
import { AddPermissionsByRoleUseCase } from "../../interfaces/IPermissionsByRole";
import { PermissionsByRoleRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddPermissionsByRole implements AddPermissionsByRoleUseCase {

     constructor(private readonly permissionsByRoleRepository: PermissionsByRoleRepository) { }

     async execute(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.permissionsByRoleRepository.addPermissionsByRole(addPermissionsByRoleDto);

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: permissionsByRole,
                    statusCode: 200,
                    error: null,
                    errorMessage: ""
               }
          } catch (error) {
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    statusCode: 500,
                    error: error,
                    errorMessage: (error as any).errmsg
               }
          }
          return resultResponse;
     }
}