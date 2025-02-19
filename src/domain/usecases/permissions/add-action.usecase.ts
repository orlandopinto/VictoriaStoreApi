import { AddActionDto } from "../../dtos/permissions";
import { AddActionUseCase } from "../../interfaces";
import { ActionRepository } from '../../repositories';
import { ApiResultResponse } from "../../types";

export class AddAction implements AddActionUseCase {

     constructor(private readonly actionRepository: ActionRepository) { }

     async execute(addActionDto: AddActionDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const action = await this.actionRepository.addAction(addActionDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: action,
                    message: "Action created successfully",
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