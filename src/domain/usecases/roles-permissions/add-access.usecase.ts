import { AddAccessDto } from "../../dtos/roles-permissions";
import { AddAccessUseCase } from "../../interfaces";
import { AccessRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddAccess implements AddAccessUseCase {

     constructor(private readonly accessRepository: AccessRepository) { }

     async execute(addAccessDto: AddAccessDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const access = await this.accessRepository.addAccess(addAccessDto);
               if (access.hasError) {
                    resultResponse.response = {
                         status: "error",
                         hasError: access.hasError,
                         data: null,
                         statusCode: 500,
                         errorMessages: access.errorMessages
                    }
                    return resultResponse;
               }
               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: access,
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