import { GetAccessUseCase } from "../../interfaces";
import { AccessRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetAccess implements GetAccessUseCase {

     constructor(private readonly rermissionsByRoleRepository: AccessRepository) { }

     async get(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const rermissionsByRole = await this.rermissionsByRoleRepository.getAccesss();

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: rermissionsByRole,
                    statusCode: 200,
                    error: null,
                    errorMessage: ""
               }
          } catch (error) {
               resultResponse.response = {
                    status: "error",
                    hasError: true,
                    statusCode: 500,
                    error: error,
                    errorMessage: (error as any).errmsg
               }
          }
          return resultResponse;
     }
}