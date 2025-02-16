import { DeleteAuthorizationDto } from "../../dtos/roles-permissions";
import { DeleteAuthorizationUseCase } from "../../interfaces";
import { AuthorizationRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteAuthorization implements DeleteAuthorizationUseCase {

     constructor(private readonly rermissionsByRoleRepository: AuthorizationRepository) { }

     async execute(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const authorization = await this.rermissionsByRoleRepository.deleteAuthorization(deleteAuthorizationDto);

               console.log('authorization: ', authorization)
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