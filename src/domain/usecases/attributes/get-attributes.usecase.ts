import { CustomError } from "../../errors/custom.error";
import { GetAttributesUseCase } from "../../interfaces";
import { AttributeNamesRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetAttributes implements GetAttributesUseCase {

     constructor(private readonly attributeRepository: AttributeNamesRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributes = await this.attributeRepository.getAttributeNames();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributes,
                    message: null,
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
