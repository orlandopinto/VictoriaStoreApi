import { DeleteAttributeNameDto } from "../../dtos/attributeNames/delete-attribute-name.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteAttributeUseCase } from "../../interfaces";
import { AttributeNamesRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteAttribute implements DeleteAttributeUseCase {

     constructor(private readonly attributeRepository: AttributeNamesRepository) { }

     async execute(deleteAttributeNameDto: DeleteAttributeNameDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributes = await this.attributeRepository.deleteAttribute(deleteAttributeNameDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: attributes,
                    message: "Attributes deleted successfully",
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
