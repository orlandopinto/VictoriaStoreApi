import { DeleteSystemUserDto } from '../../dtos/auth/delete-system-user.dto';
import { CustomError } from '../../errors/custom.error';
import { DeleteSystemUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class DeleteSystemUser implements DeleteSystemUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository
     ) { }

     async execute(deleteSystemUserDto: DeleteSystemUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const systemUser = await this.authRepository.deleteSystemUser(deleteSystemUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: systemUser,
                    message: "User deleted successfully",
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