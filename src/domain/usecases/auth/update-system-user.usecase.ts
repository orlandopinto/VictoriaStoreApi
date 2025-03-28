import { UpdateSystemUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { UpdateSystemUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class UpdateSystemUser implements UpdateSystemUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository
     ) { }

     async execute(updateSystemUserDto: UpdateSystemUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemUser = await this.authRepository.updateSystemUser(updateSystemUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemUser,
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