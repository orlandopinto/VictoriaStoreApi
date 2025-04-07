import { UpdateAttributeNameDto } from "../../dtos/attributeNames/update-attribute-name.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateAttributeUseCase } from "../../interfaces";
import { AttributeNamesRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateAttribute implements UpdateAttributeUseCase {

     constructor(private readonly attributeRepository: AttributeNamesRepository) { }

     async execute(updateAttributeNameDto: UpdateAttributeNameDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributes = await this.attributeRepository.updateAttributeName(updateAttributeNameDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributes,
                    message: "Attributes updated successfully",
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
