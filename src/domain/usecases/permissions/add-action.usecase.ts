import { AddActionDto } from "../../dtos/permissions";
import { CustomError } from "../../errors/custom.error";
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
                    statusCode: 201,
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