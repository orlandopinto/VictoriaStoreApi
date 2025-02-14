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

               resultResponse.response = {
                    status: "success",
                    hasError: false,
                    data: action,
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