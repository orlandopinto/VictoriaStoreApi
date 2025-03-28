import { DeleteSystemUserDto } from "../../dtos/systemusers/delete-system-user.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteSystemUserUseCase } from "../../interfaces/ISystemUsers";
import { SystemUserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteSystemUser implements DeleteSystemUserUseCase {

     constructor(private readonly systemuserRepository: SystemUserRepository) { }

     async execute(deleteSystemUserDto: DeleteSystemUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemuser = await this.systemuserRepository.deleteSystemUser(deleteSystemUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemuser,
                    message: "SystemUser deleted successfully",
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
