import { GetPermissionsByRoleEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { GetPermissionsUseCase } from "../../interfaces";
import { PermissionsByRoleRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetPermissionsByRole implements GetPermissionsUseCase {

     constructor(private readonly permissionsByRoleRepository: PermissionsByRoleRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsProfile = await this.permissionsByRoleRepository.getPermissionsByRole();
               const data = { ...permissionsProfile } as unknown as GetPermissionsByRoleEntity
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: data,
                    message: null,
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