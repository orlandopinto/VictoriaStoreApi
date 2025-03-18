import { SignInUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignInUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class SignInUser implements SignInUserUseCase {

     constructor(private readonly authRepository: AuthRepository) { }

     async execute(signInUserDto: SignInUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const environment = await this.authRepository.signIn(signInUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: environment,
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