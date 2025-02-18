import { SignInUserDto } from '../../dtos/auth';
import { EnvironmentSystemUserEntityResult } from '../../entities';
import { SignInUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse } from '../../types';

export class SignInUser implements SignInUserUseCase {

     constructor(private readonly authRepository: AuthRepository) { }

     async execute(SignInUserDto: SignInUserDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const environment = await this.authRepository.signIn(SignInUserDto);

               if (environment.hasError) {
                    resultResponse = {
                         status: "error",
                         hasError: environment.hasError,
                         data: null,
                         message: null,
                         statusCode: 500,
                         stackTrace: null,
                         errorMessage: null
                    }
                    return resultResponse;
               }

               const environmentResponse: EnvironmentSystemUserEntityResult = {
                    token: environment.token,
                    EnviromentData: environment.EnviromentData
               }

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: environmentResponse,
                    message: null,
                    statusCode: 200,
                    stackTrace: null,
                    errorMessage: null
               }

          } catch (error) {
               const err = error as Error
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: null,
                    statusCode: 500,
                    stackTrace: err.stack,
                    errorMessage: err.message
               }
          }
          return resultResponse;
     }
}