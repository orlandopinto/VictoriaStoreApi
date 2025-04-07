import { AddVariantDto } from "../../dtos/variants";
import { CustomError } from "../../errors/custom.error";
import { AddVariantUseCase } from "../../interfaces";
import { VariantRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddVariant implements AddVariantUseCase {

     constructor(private readonly variantRepository: VariantRepository) { }

     async execute(addVariantDto: AddVariantDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const variant = await this.variantRepository.addVariant(addVariantDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: variant,
                    message: "Variant created successfully",
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
