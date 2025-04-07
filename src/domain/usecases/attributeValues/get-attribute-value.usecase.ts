import { CustomError } from "../../errors/custom.error";
import { GetAttributeValuesUseCase } from "../../interfaces/IAttributeValues";
import { AttributeValueRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetAttributeValues implements GetAttributeValuesUseCase {

     constructor(private readonly attributeValueRepository: AttributeValueRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributeValues = await this.attributeValueRepository.getAttributeValues();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributeValues,
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
