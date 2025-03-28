import { CustomError } from "../../errors/custom.error";
import { GetUsersUseCase } from "../../interfaces/IUsers";
import { UserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetUsers implements GetUsersUseCase {

     constructor(private readonly userRepository: UserRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const users = await this.userRepository.getUsers();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: users,
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
