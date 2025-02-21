import { AddPermissionsDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
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