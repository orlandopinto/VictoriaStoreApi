import { DeleteUserDto } from "../../dtos/users/delete-user.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteUserUseCase } from "../../interfaces/IUsers";
import { UserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteUser implements DeleteUserUseCase {

     constructor(private readonly userRepository: UserRepository) { }

     async execute(deleteUserDto: DeleteUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.userRepository.deleteUser(deleteUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
                    message: "User deleted successfully",
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
