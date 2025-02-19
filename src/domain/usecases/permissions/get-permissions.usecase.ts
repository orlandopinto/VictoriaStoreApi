import { GetPermissionsDto } from "../../dtos/permissions";
import { GetPermissionsEntity } from "../../entities";
import { GetPermissionsUseCase } from "../../interfaces";
import { PermissionsRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetPermissions implements GetPermissionsUseCase {

     constructor(private readonly permissionsByRoleRepository: PermissionsRepository) { }

     async execute(getPermissionsDto: GetPermissionsDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.permissionsByRoleRepository.getPermissions(getPermissionsDto);
               const data = { ...permissionsByRole } as unknown as GetPermissionsEntity
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: data,
                    message: null,
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