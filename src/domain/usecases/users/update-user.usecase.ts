import { UpdateUserDto } from "../../dtos/users/update-user.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateUserUseCase } from "../../interfaces/IUsers";
import { UserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateUser implements UpdateUserUseCase {

     constructor(private readonly userRepository: UserRepository) { }

     async execute(updateUserDto: UpdateUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.userRepository.updateUser(updateUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
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
