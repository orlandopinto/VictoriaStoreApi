import { AddUserDto } from "../../dtos/users/add-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AddUserUseCase } from "../../interfaces";
import { UserRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddUser implements AddUserUseCase {

     constructor(private readonly userRepository: UserRepository) { }

     async execute(addUserDto: AddUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.userRepository.addUser(addUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
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
