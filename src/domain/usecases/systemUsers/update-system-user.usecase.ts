import { UpdateSystemUserDto } from "../../dtos/systemusers/update-system-user.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateSystemUserUseCase } from "../../interfaces/ISystemUsers";
import { SystemUserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateSystemUser implements UpdateSystemUserUseCase {

     constructor(private readonly systemuserRepository: SystemUserRepository) { }

     async execute(updateSystemUserDto: UpdateSystemUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemuser = await this.systemuserRepository.updateSystemUser(updateSystemUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemuser,
                    message: "User updated successfully",
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
