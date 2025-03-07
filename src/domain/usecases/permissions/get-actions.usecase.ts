import { GetActionsEntity } from "../../entities";
import { CustomError } from "../../errors/custom.error";
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