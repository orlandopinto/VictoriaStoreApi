import { ChangePasswordDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { ChangePasswordUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class ChangePassword implements ChangePasswordUseCase {

     constructor(private readonly authRepository: AuthRepository) { }

     async execute(changePasswordDto: ChangePasswordDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.authRepository.changePassword(changePasswordDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
                    message: "Password changed successfully",
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