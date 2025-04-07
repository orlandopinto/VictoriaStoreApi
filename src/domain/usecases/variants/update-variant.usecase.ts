import { UpdateVariantDto } from "../../dtos/variants";
import { CustomError } from "../../errors/custom.error";
import { UpdateVariantUseCase } from "../../interfaces/IVariants";
import { VariantRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateVariant implements UpdateVariantUseCase {

     constructor(private readonly variantRepository: VariantRepository) { }

     async execute(updateVariantDto: UpdateVariantDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const variant = await this.variantRepository.updateVariant(updateVariantDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: variant,
                    message: "Variant updated successfully",
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
