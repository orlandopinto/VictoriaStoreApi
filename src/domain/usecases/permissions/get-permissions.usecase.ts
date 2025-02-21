import { GetPermissionsDto } from "../../dtos/permissions";
import { GetPermissionsEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { GetPermissionsUseCase } from "../../interfaces";
import { PermissionsRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetPermissions implements GetPermissionsUseCase {

     constructor(private readonly permissionsByRoleRepository: PermissionsRepository) { }

     async execute(getPermissionsDto: GetPermissionsDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissionsByRole = await this.permissionsByRoleRepository.getPermissions();
               const data = { ...permissionsByRole } as unknown as GetPermissionsEntity
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