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
                    resultResponse.response = {
                         status: "error",
                         hasError: environment.hasError,
                         data: null,
                         statusCode: 500,
                         errorMessages: environment.errorMessages
                    }
                    return resultResponse;
               }

               const environmentResponse: EnvironmentSystemUserEntityResult = {
                    token: environment.token,
                    EnviromentData: environment.EnviromentData,
                    errorMessages: environment.errorMessages,
                    hasError: environment.hasError,
               }

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: environmentResponse,
                    statusCode: 200,
                    errorMessages: null
               }

          } catch (error) {
               const err = error as Error
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    data: null,
                    statusCode: 500,
                    error: err.stack,
                    errorMessage: err.message,
               }
          }
          return resultResponse;
     }
}