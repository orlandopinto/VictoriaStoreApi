import { SignUpUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignUpUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class SignUpUser implements SignUpUserUseCase {

     constructor(private readonly authRepository: AuthRepository) { }

     async execute(signUpUserDto: SignUpUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const user = await this.authRepository.signUp(signUpUserDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: user,
                    message: "User registered successfully",
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