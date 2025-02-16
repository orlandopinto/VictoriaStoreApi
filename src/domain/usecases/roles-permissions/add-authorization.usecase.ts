import { AddAuthorizationDto } from "../../dtos/roles-permissions";
import { AddAuthorizationUseCase } from "../../interfaces";
import { AuthorizationRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddAuthorization implements AddAuthorizationUseCase {

     constructor(private readonly authorizationRepository: AuthorizationRepository) { }

     async execute(addAuthorizationDto: AddAuthorizationDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const authorization = await this.authorizationRepository.addAuthorization(addAuthorizationDto);
               if (authorization.hasError) {
                    throw new Error(authorization.message);
               }

               //NOTE: Al campo hasError se le asigna el valor de undefined para que no se muestre en los datos que se envían
               authorization.hasError = undefined

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: authorization,
                    statusCode: 200,
                    error: null,
                    errorMessage: ""
               }
          } catch (error) {
               const err = error as Error
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    statusCode: 500,
                    error: err.stack,
                    errorMessage: err.message
               }
          }
          return resultResponse;
     }
}