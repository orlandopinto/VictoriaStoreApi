import { DeleteVariantDto } from "../../dtos/variants";
import { CustomError } from "../../errors/custom.error";
import { DeleteVariantUseCase } from "../../interfaces/IVariants";
import { VariantRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteVariant implements DeleteVariantUseCase {

     constructor(private readonly variantRepository: VariantRepository) { }

     async execute(deleteVariantDto: DeleteVariantDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const variant = await this.variantRepository.deleteVariant(deleteVariantDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: variant,
                    message: "Variant deleted successfully",
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
