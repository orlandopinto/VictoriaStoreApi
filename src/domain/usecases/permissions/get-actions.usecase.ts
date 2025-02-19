import { GetActionsEntity } from "../../entities";
import { GetActionsUseCase } from "../../interfaces";
import { ActionRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetActions implements GetActionsUseCase {

     constructor(private readonly actionsRepository: ActionRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const actions = await this.actionsRepository.getActions();
               const data = { ...actions } as unknown as GetActionsEntity
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: data,
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