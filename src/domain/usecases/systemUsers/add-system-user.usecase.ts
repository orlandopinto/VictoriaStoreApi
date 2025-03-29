import { AddSystemUserDto } from "../../dtos/systemusers/add-system-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AddSystemUserUseCase } from "../../interfaces";
import { SystemUserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddSystemUser implements AddSystemUserUseCase {

     constructor(private readonly systemUserRepository: SystemUserRepository) { }

     async execute(addSystemUserDto: AddSystemUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemuser = await this.systemUserRepository.addSystemUser(addSystemUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemuser,
                    message: "User created successfully",
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
