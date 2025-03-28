import { DeleteAttributeDto } from "../../dtos/attributes/delete-attribute.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteAttributeUseCase } from "../../interfaces";
import { AttributeRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteAttribute implements DeleteAttributeUseCase {

     constructor(private readonly attributeRepository: AttributeRepository) { }

     async execute(deleteAttributeDto: DeleteAttributeDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const attributes = await this.attributeRepository.deleteAttribute(deleteAttributeDto);
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
