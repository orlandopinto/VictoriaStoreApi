import { DeleteRoleDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { DeleteRoleUseCase } from "../../interfaces/IRoles";
import { RolesRepository } from "../../repositories/roles.repository";
import { ApiResultResponse } from "../../types";

export class DeleteRole implements DeleteRoleUseCase {

     constructor(private readonly roleRepository: RolesRepository) { }

     async execute(deleteRoleDto: DeleteRoleDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const role = await this.roleRepository.deleteRole(deleteRoleDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: role,
                    message: "Role deleted successfully.",
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