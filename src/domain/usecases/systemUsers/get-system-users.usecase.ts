import { CustomError } from "../../errors/custom.error";
import { GetSystemUsersUseCase } from "../../interfaces/ISystemUsers";
import { SystemUserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetSystemUsers implements GetSystemUsersUseCase {

     constructor(private readonly systemUserRepository: SystemUserRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemUsers = await this.systemUserRepository.getSystemUsers();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemUsers,
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
