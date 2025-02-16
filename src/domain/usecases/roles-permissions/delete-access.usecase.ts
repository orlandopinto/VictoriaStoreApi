import { DeleteAccessDto } from "../../dtos/roles-permissions";
import { DeleteAccessUseCase } from "../../interfaces/IAccess";
import { AccessRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteAccess implements DeleteAccessUseCase {

     constructor(private readonly rermissionsByRoleRepository: AccessRepository) { }

     async execute(deleteAccessDto: DeleteAccessDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const access = await this.rermissionsByRoleRepository.deleteAccess(deleteAccessDto);

               console.log('access: ', access)
               if (access.hasError) {
                    throw new Error(access.message);
               }

               //NOTE: Al campo hasError se le asigna el valor de undefined para que no se muestre en los datos que se envían
               access.hasError = undefined

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: access,
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