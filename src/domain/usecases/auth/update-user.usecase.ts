import { UpdateUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { UpdateUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class UpdateUser implements UpdateUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository
     ) { }

     async execute(updateUserDto: UpdateUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.authRepository.update(updateUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
                    message: "User updated successfully",
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