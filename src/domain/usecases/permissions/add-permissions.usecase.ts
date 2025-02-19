import { AddPermissionsDto } from "../../dtos/permissions";
import { AddPermissionsUseCase } from "../../interfaces";
import { PermissionsRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddPermissions implements AddPermissionsUseCase {

     constructor(private readonly permissionsRepository: PermissionsRepository) { }

     async execute(addPermissionsDto: AddPermissionsDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const permissions = await this.permissionsRepository.addPermissions(addPermissionsDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: permissions,
                    message: "Permission created successfully",
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