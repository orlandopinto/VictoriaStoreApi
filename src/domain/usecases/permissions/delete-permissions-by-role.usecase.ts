// import { DeletePermissionsByRoleDto } from "../../dtos/permissions";
// import { CustomError } from "../../errors/custom.error";
// import { DeletePermissionsByRoleUseCase } from "../../interfaces/IPermissionsByRole";
// import { PermissionsByRoleRepository } from "../../repositories";
// import { ApiResultResponse } from "../../types";

// export class DeletePermissionsByRole implements DeletePermissionsByRoleUseCase {

//      constructor(private readonly permissionsByRoleRepository: PermissionsByRoleRepository) { }

//      async execute(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<ApiResultResponse> {

//           let resultResponse: ApiResultResponse = {} as ApiResultResponse

//           try {
//                const permissionsByRole = await this.permissionsByRoleRepository.deletePermissionsByRole(deletePermissionsByRoleDto);
//                resultResponse = {
//                     status: "success",
//                     hasError: false,
//                     data: permissionsByRole,
//                     message: "Permission deleted successfully.",
//                     statusCode: 200,
//                     stackTrace: null
//                }
//           } catch (error) {
//                const err = error as Error
//                let statusCode: number = 500;
//                if (error instanceof CustomError) {
//                     statusCode = error.statusCode;
//                }
//                resultResponse = {
//                     status: "error",
//                     hasError: true,
//                     data: null,
//                     message: err.message,
//                     statusCode: statusCode,
//                     stackTrace: err.stack
//                }
//           }
//           return resultResponse;
//      }
// }