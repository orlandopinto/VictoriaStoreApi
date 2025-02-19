import { GetRolesEntity } from "../../entities";
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