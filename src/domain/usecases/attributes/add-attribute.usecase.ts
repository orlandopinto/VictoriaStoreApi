import { AddAttributeNameDto } from "../../dtos/attributeNames/add-attribute-name.dto";
import { CustomError } from "../../errors/custom.error";
import { AddAttributeUseCase } from "../../interfaces";
import { AttributeNamesRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddAttribute implements AddAttributeUseCase {

     constructor(private readonly attributeRepository: AttributeNamesRepository) { }

     async execute(addAttributeNameDto: AddAttributeNameDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributes = await this.attributeRepository.addAttributeName(addAttributeNameDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributes,
                    message: "Attribute created successfully",
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
