import { GetRolesEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
import { GetRolesUseCase } from "../../interfaces";
import { RolesRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetRoles implements GetRolesUseCase {

     constructor(private readonly rolesByRoleRepository: RolesRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const rolesByRole = await this.rolesByRoleRepository.getRoles();
               const data = { ...rolesByRole } as unknown as GetRolesEntity
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