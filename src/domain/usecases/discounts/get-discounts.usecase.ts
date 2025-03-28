import { CustomError } from "../../errors/custom.error";
import { GetDiscountsUseCase } from "../../interfaces/IDiscounts";
import { DiscountRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetDiscounts implements GetDiscountsUseCase {

     constructor(private readonly discountRepository: DiscountRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const discounts = await this.discountRepository.getDiscounts();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: discounts,
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