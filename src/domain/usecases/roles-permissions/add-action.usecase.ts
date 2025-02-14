import { AddActionDto } from "../../dtos/roles-permissions";
import { AddActionUseCase } from "../../interfaces";
import { ActionRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddAction implements AddActionUseCase {

     constructor(private readonly actionRepository: ActionRepository) { }

     async execute(addActionDto: AddActionDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const action = await this.actionRepository.addAction(addActionDto);

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