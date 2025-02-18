import { DeleteActionDto } from "../../dtos/roles-permissions";
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