import { CustomError } from "../../errors/custom.error";
import { GetVariantsUseCase } from "../../interfaces/IVariants";
import { VariantRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetVariants implements GetVariantsUseCase {

     constructor(private readonly variantRepository: VariantRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const variants = await this.variantRepository.getVariants();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: variants,
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
