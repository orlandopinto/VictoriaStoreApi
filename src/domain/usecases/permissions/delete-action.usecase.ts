import { DeleteActionDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
import { DeleteActionUseCase } from "../../interfaces";
import { ActionRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteAction implements DeleteActionUseCase {

     constructor(private readonly actionRepository: ActionRepository) { }

     async execute(deleteActionDto: DeleteActionDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const action = await this.actionRepository.deleteAction(deleteActionDto);

               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: action,
                    message: "Action deleted successfully",
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